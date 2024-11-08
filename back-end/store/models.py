# Django
from django.db import models
from django.utils.text import slugify

# Libraries
from shortuuid.django_fields import ShortUUIDField

# My apps
from vendor.models import Vendor


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

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


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

