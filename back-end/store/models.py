# Django
from django.db import models
from django.utils.text import slugify
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save

# Libraries
from shortuuid.django_fields import ShortUUIDField

# My apps
from vendor.models import Vendor
from userauths.models import User, Profile


class Category(models.Model):
    title = models.CharField(max_length=150)

    slug = models.SlugField(unique=True)

    image = models.ImageField(
        upload_to="categories", blank=True, null=True, default="category.jpg"
    )

    active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "category"
        verbose_name_plural = "categories"
        ordering = ["title"]

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Product(models.Model):
    STATUS_CHOICES = [
        ("disable", "Disable"),
        ("draft", "Draft"),
        ("published", "Published"),
    ]

    pid = ShortUUIDField(unique=True, length=10, alphabet="abcdefgh12345")

    name = models.CharField(max_length=150)

    slug = models.SlugField(unique=True)

    vendor = models.ForeignKey(
        Vendor, on_delete=models.CASCADE, related_name="products"
    )

    description = models.TextField()

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="products",
    )

    image = models.ImageField(
        upload_to="products", blank=True, null=True, default="product.jpg"
    )

    # in mishe gheimat product 'ba takhfif'
    price = models.DecimalField(max_digits=8, decimal_places=2)

    # in mishe gheimat product 'bedun takhfif'
    old_price = models.DecimalField(max_digits=8, decimal_places=2)

    # in mishe gheimat 'haml va naghl' product
    shipping_amount = models.DecimalField(max_digits=8, decimal_places=2)

    # in mishe 'quantity product' dakhel 'anbar'
    stock_quantity = models.PositiveIntegerField(default=1)

    # in baraye zamani ke 'stock_quantity' behse 0 yani product dakhel anbar nadarim.
    in_stock = models.BooleanField(default=True)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="published"
    )

    featured = models.BooleanField(default=False)

    views = models.PositiveIntegerField(default=0)

    rating = models.PositiveIntegerField(default=0)

    datetime_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "product"
        verbose_name_plural = "products"
        ordering = ["datetime_created"]

    # Calculates the average rating of the product
    def product_rating(self):
        product_rating = Review.objects.filter(product=self).aggregate(avg_rating=models.Avg('rating'))
        return product_rating['avg_rating']

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = slugify(self.name)
            
        self.rating = self.product_rating()
        
        super(Product, self).save(*args, **kwargs) 


class Gallery(models.Model):
    gid = ShortUUIDField(unique=True, length=10, alphabet="abcdefgh12345")

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="galleries"
    )

    image = models.ImageField(upload_to="products", default="product.jpg")

    active = models.BooleanField(default=True)

    datetime_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name

    class Meta:
        db_table = ""
        managed = True
        verbose_name = "Product Image"
        verbose_name_plural = "Product Images"


class Specification(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="specifications"
    )

    title = models.CharField(max_length=100)

    content = models.TextField()

    datetime_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Size(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="sizes")

    name = models.CharField(max_length=100)

    price = models.DecimalField(max_digits=8, decimal_places=2)

    datetime_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Color(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="colors"
    )

    name = models.CharField(max_length=100)

    color_code = models.CharField(max_length=100)

    datetime_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Cart(models.Model):
    cart_id = models.CharField(max_length=1000, null=True, blank=True)

    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="carts"
    )

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="carts")

    size = models.CharField(max_length=100, null=True, blank=True)

    color = models.CharField(max_length=100, null=True, blank=True)

    quantity = models.PositiveIntegerField(default=0, null=True, blank=True)

    price = models.DecimalField(decimal_places=2, max_digits=8, null=True, blank=True)

    # inja ma meghdar 'quantity dar price' ro mizarim.
    sub_total = models.DecimalField(
        decimal_places=2,
        max_digits=8,
        null=True,
        blank=True,
        help_text="Total of Product price * Product Quantity",
    )

    shipping_amount = models.DecimalField(
        decimal_places=2, max_digits=8, null=True, blank=True
    )

    service_fee = models.DecimalField(
        decimal_places=2, max_digits=8, null=True, blank=True
    )

    tax_fee = models.DecimalField(decimal_places=2, max_digits=8, null=True, blank=True)

    total = models.DecimalField(decimal_places=2, max_digits=8, null=True, blank=True)

    country = models.CharField(max_length=100, null=True, blank=True)

    datetime_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"cart: {self.cart_id} - product: {self.product.name}"


# Model for Cart Orders
class Order(models.Model):
    PAYMENT_STATUS = (
        ("paid", "Paid"),
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("cancelled", "Cancelled"),
        ("initiated", "Initiated"),
        ("failed", "failed"),
        ("refunding", "refunding"),
        ("unpaid", "unpaid"),
        ("expired", "expired"),
    )

    ORDER_STATUS = (
        ("Pending", "Pending"),
        ("Fulfilled", "Fulfilled"),
        ("Partially Fulfilled", "Partially Fulfilled"),
        ("Cancelled", "Cancelled"),
    )

    oid = ShortUUIDField(length=10, max_length=25, alphabet="abcdefghijklmnopqrstuvxyz")

    # Vendors associated with the order
    vendor = models.ManyToManyField(Vendor, blank=True, related_name="orders")

    # Buyer of the order
    buyer = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders"
    )

    # Total price of the order
    sub_total = models.DecimalField(max_digits=12, decimal_places=2)

    # Shipping cost
    shipping_amount = models.DecimalField(max_digits=12, decimal_places=2)

    # VAT (Value Added Tax) cost
    tax_fee = models.DecimalField(max_digits=12, decimal_places=2)

    # Service fee cost
    service_fee = models.DecimalField(max_digits=12, decimal_places=2)

    # Total cost of the order
    total = models.DecimalField(max_digits=12, decimal_places=2)

    # Order status attributes
    payment_status = models.CharField(
        max_length=100, choices=PAYMENT_STATUS, default="initiated"
    )

    order_status = models.CharField(
        max_length=100, choices=ORDER_STATUS, default="Pending"
    )

    # Discounts
    initial_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="The original total before discounts",
    )

    saved = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Amount saved by customer",
    )

    # Personal Information
    full_name = models.CharField(max_length=1000)

    email = models.CharField(max_length=1000)

    mobile = models.CharField(max_length=1000)

    # Shipping Address
    address = models.CharField(max_length=1000, null=True, blank=True)

    city = models.CharField(max_length=1000, null=True, blank=True)

    state = models.CharField(max_length=1000, null=True, blank=True)

    country = models.CharField(max_length=1000, null=True, blank=True)

    datetime_created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-datetime_created"]
        verbose_name_plural = "Orders"

    def __str__(self):
        return self.oid


# Define a model for Cart Order Item
class OrderItem(models.Model):
    oid = ShortUUIDField(length=10, max_length=25, alphabet="abcdefghijklmnopqrstuvxyz")

    # A foreign key relationship to the Order model with CASCADE deletion
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )

    # A foreign key relationship to the Vendor model with SET_NULL option
    vendor = models.ForeignKey(
        Vendor, on_delete=models.SET_NULL, null=True, related_name="order_items"
    )

    # A foreign key relationship to the Product model with CASCADE deletion
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="order_items"
    )

    # Fields for color and size with max length 100, allowing null and blank values
    color = models.CharField(max_length=100, null=True, blank=True)

    size = models.CharField(max_length=100, null=True, blank=True)

    # Integer field to store the quantity (default is 0)
    quantity = models.IntegerField(default=0)

    # Decimal fields for price, total, shipping, VAT, service fee, grand total, and more
    price = models.DecimalField(max_digits=12, decimal_places=2)

    sub_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Total of Product price * Product Quantity",
    )

    shipping_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Estimated Shipping Fee = shipping_fee * total",
    )

    tax_fee = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Estimated Vat based on delivery country = tax_rate * (total + shipping)",
    )

    service_fee = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Estimated Service Fee = service_fee * total (paid by buyer to platform)",
    )

    total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Grand Total of all amount listed above",
    )

    initial_total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Grand Total of all amount listed above before discount",
    )

    saved = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Amount saved by customer",
    )

    datetime_created = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name_plural = "Order Items"
        ordering = ["-datetime_created"]


# Product Frequently Asked Question
class ProductFAQ(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="user_FAQs", null=True, blank=True)
    
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_FAQs"
    )
    
    email = models.EmailField(null=True, blank=True)
    
    question = models.CharField(max_length=100)
    
    answer = models.TextField()

    active = models.BooleanField(default=True)
    
    datetime_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.question

    class Meta:
        verbose_name_plural = "Product FAQs"
        ordering = ["-datetime_created"]


class Review(models.Model):
    RATING = [
        (1, "1 star"),
        (2, "2 star"),
        (3, "3 star"),
        (4, "4 star"),
        (5, "5 star"),
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="user_reviews", null=True, blank=True)
    
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_reviews"
    )
    
    review = models.TextField()
    
    reply = models.TextField(null=True, blank=True)
    
    rating = models.IntegerField(default=None, choices=RATING)
    
    active = models.BooleanField(default=True)
    
    datetime_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.product

    class Meta:
        verbose_name_plural = "Product Reviews & Rating"
        ordering = ["-datetime_created"]

    def profile(self):
        return Profile.objects.get(user=self.user)

""" 
    ma inja miaim migim har vaghti ke 'object' dar 'model Review save' shod bia 'function save' 
    hamin 'product' ro ham seda bezan.
    ba seda zadan 'function save' dar 'product' miad 'miangin ya average rating' ke be in 'product' dade shode ro 
    az 'model Review' migire va dakhel 'field rating model product' gharar mide.
"""
@receiver(post_save, sender=Review)
def update_product_rating(sender, instance, **kwargs):
    if instance.product:
        instance.product.save()
