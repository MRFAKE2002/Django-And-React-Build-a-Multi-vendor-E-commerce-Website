# Django

# Libraries
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from decimal import Decimal

# My apps
from .models import Category, Order, OrderItem, Product, Cart, Tax
from .serializers import (
    CategorySerializer,
    OrderSerializer,
    ProductSerializer,
    CartSerializer,
)
from userauths.models import User


# dar inja ma miaim 'data' marbut be 'Product' ro be surat 'list' namayesh midim.
class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


# dar inja ma miaim 'data' marbut be 'Category' ro be surat 'list' namayesh midim.
class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


# dar inja ma miaim 'data' marbut be 'Product' khasi ro ke 'slug' az 'url' gereftim ro be surat 'detail' namayesh midim.
class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        # inja ma mikhaim 'data' oun 'product' khasi ro ke 'slug' az 'url' gereftim ba estefade az 'query' zadan 'return' mikonim.

        slug = self.kwargs["slug"]

        return Product.objects.get(slug=slug)


class CartListCreateAPIView(generics.ListCreateAPIView):
    """
    dakhel in 'class' ma mikhaim 'object Cart' besazim va ham betunim 'List object Cart' ro bebinim.
    """

    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # dar inja oun data ke az samt 'Front' miad ro migirim ta betunim 'object Cart' besazim.

        # inja oun data ro az 'Front' migirim.
        payload = request.data

        cart_id = payload["cart_id"]
        product_id = payload["product_id"]
        user_id = payload["user_id"]
        price = payload["product_price"]
        shipping_amount = payload["product_shipping_amount"]
        quantity = payload["quantity"]
        size = payload["size"]
        color = payload["color"]
        country = payload["country"]

        product = Product.objects.get(id=product_id)

        # ? if user_id != "undefined":
        # ?   user = User.objects.get(id=user_id)
        # ? else:
        # ?   user = None
        user = User.objects.get(id=user_id) if user_id != "undefined" else None

        # ? tax = Tax.objects.filter(country=country).first()
        if tax := Tax.objects.filter(country=country).first():
            tax_rate = tax.rate / 100
        else:
            tax_rate = 0

        service_fee_percentage = 20 / 100
        if cart := Cart.objects.filter(cart_id=cart_id, product=product).first():
            cart.product = product
            cart.user = user
            cart.quantity = quantity
            cart.price = price
            cart.sub_total = Decimal(price) * int(quantity)
            cart.shipping_amount = Decimal(shipping_amount) * int(quantity)
            cart.tax_fee = Decimal(tax_rate) * int(quantity)
            cart.color = color
            cart.size = size
            cart.country = country
            cart.cart_id = cart_id

            cart.service_fee = Decimal(service_fee_percentage) * Decimal(cart.sub_total)

            cart.total = (
                cart.sub_total + cart.shipping_amount + cart.service_fee + cart.tax_fee
            )

            cart.save()

            return Response(
                {"message": "Cart Updated Successfully"}, status=status.HTTP_200_OK
            )
        else:
            cart = Cart()

            cart.product = product
            cart.user = user
            cart.quantity = quantity
            cart.price = price
            cart.sub_total = Decimal(price) * int(quantity)
            cart.shipping_amount = Decimal(shipping_amount) * int(quantity)
            cart.tax_fee = Decimal(tax_rate) * int(quantity)
            cart.color = color
            cart.size = size
            cart.country = country
            cart.cart_id = cart_id

            cart.service_fee = Decimal(service_fee_percentage) * Decimal(cart.sub_total)

            cart.total = (
                cart.sub_total + cart.shipping_amount + cart.service_fee + cart.tax_fee
            )

            cart.save()

            return Response(
                {"message": "Cart Updated Successfully"}, status=status.HTTP_201_CREATED
            )


class CartListAPIView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        cart_id = self.kwargs["cart_id"]

        # inja chon momkene 'user_id' nabashe baraye hamin 'get' mizanim ke 'error' nade.
        user_id = self.kwargs.get("user_id")

        if user_id is not None:
            queryset = Cart.objects.select_related("user").filter(
                user_id=user_id, cart_id=cart_id
            )
        else:
            queryset = Cart.objects.filter(cart_id=cart_id)

        return queryset


class CartDetailAPIView(generics.RetrieveAPIView):
    # Define the serializer class for the view
    serializer_class = CartSerializer
    # Specify the lookup field for retrieving objects using 'cart_id'; default is 'pk'
    lookup_field = "cart_id"

    # Add a permission class for the view
    permission_classes = (AllowAny,)

    def get_queryset(self):
        # Get 'cart_id' and 'user_id' from the URL kwargs
        cart_id = self.kwargs["cart_id"]
        user_id = self.kwargs.get(
            "user_id"
        )  # Use get() to handle cases where 'user_id' is not present

        if user_id is not None:
            # If 'user_id' is provided, filter the queryset by both 'cart_id' and 'user_id'
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.select_related("user").filter(
                cart_id=cart_id, user=user
            )
        else:
            # If 'user_id' is not provided, filter the queryset by 'cart_id' only
            queryset = Cart.objects.filter(cart_id=cart_id)

        return queryset

    def get(self, request, *args, **kwargs):
        # Get the queryset of cart items based on 'cart_id' and 'user_id' (if provided)
        queryset = self.get_queryset()

        # Initialize sums for various cart item attributes
        total_shipping = 0.0
        total_tax = 0.0
        total_service_fee = 0.0
        total_sub_total = 0.0
        total_total = 0.0

        # Iterate over the queryset of cart items to calculate cumulative sums
        for cart_item in queryset:
            # Calculate the cumulative shipping, tax, service_fee, and total values
            total_shipping += float(self.calculate_shipping(cart_item))
            total_tax += float(self.calculate_tax(cart_item))
            total_service_fee += float(self.calculate_service_fee(cart_item))
            total_sub_total += float(self.calculate_sub_total(cart_item))
            total_total += round(float(self.calculate_total(cart_item)), 2)

        # Create a data dictionary to store the cumulative values
        data = {
            "shipping": round(total_shipping, 2),
            "tax": total_tax,
            "service_fee": total_service_fee,
            "sub_total": total_sub_total,
            "total": total_total,
        }

        # Return the data in the response
        return Response(data)

    def calculate_shipping(self, cart_item):
        # Implement your shipping calculation logic here for a single cart item
        # Example: Calculate based on weight, destination, etc.
        return cart_item.shipping_amount

    def calculate_tax(self, cart_item):
        # Implement your tax calculation logic here for a single cart item
        # Example: Calculate based on tax rate, product type, etc.
        return cart_item.tax_fee

    def calculate_service_fee(self, cart_item):
        # Implement your service fee calculation logic here for a single cart item
        # Example: Calculate based on service type, cart total, etc.
        return cart_item.service_fee

    def calculate_sub_total(self, cart_item):
        # Implement your service fee calculation logic here for a single cart item
        # Example: Calculate based on service type, cart total, etc.
        return cart_item.sub_total

    def calculate_total(self, cart_item):
        # Implement your total calculation logic here for a single cart item
        # Example: Sum of sub_total, shipping, tax, and service_fee
        return cart_item.total


class CartDeleteAPIView(generics.DestroyAPIView):
    serializer_class = CartSerializer
    lookup_field = "cart_id"

    def get_queryset(self):
        cart_id = self.kwargs["cart_id"]
        item_id = self.kwargs["item_id"]
        user_id = self.kwargs.get("user_id")

        if user_id is not None:
            cart = Cart.objects.select_related("user").filter(
                id=item_id, cart_id=cart_id, user_id=user_id
            )
        else:
            cart = Cart.objects.filter(id=item_id, cart_id=cart_id)

        return cart


class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    queryset = Order.objects.all()

    def create(self, request):
        payload = request.data

        cart_id = payload["cart_id"]
        user_id = payload["user_id"]
        full_name = payload["full_name"]
        email = payload["email"]
        mobile = payload["mobile"]
        address = payload["address"]
        city = payload["city"]
        state = payload["state"]
        country = payload["country"]

        if user_id == 0:
            user = None
        else:
            user = User.objects.get(id=user_id)

        cart_items = Cart.objects.select_related("product").filter(cart_id=cart_id)

        total_shipping_amount = Decimal(0.00)
        total_tax_fee = Decimal(0.00)
        total_service_fee = Decimal(0.00)
        total_sub_total = Decimal(0.00)
        total_initial_total = Decimal(0.00)
        total_total = Decimal(0.00)

        new_order = Order.objects.create(
            full_name=full_name,
            email=email,
            mobile=mobile,
            address=address,
            city=city,
            state=state,
            country=country,
        )

        for cart in cart_items:
            OrderItem.objects.create(
                order=new_order,
                product=cart.product,
                vendor=cart.product.vendor,
                quantity=cart.quantity,
                color=cart.color,
                size=cart.size,
                price=cart.price,
                sub_total=cart.sub_total,
                shipping_amount=cart.shipping_amount,
                service_fee=cart.service_fee,
                tax_fee=cart.tax_fee,
                total=cart.total,
                initial_total=cart.total,
            )

            total_shipping_amount += Decimal(cart.shipping_amount)
            total_tax_fee += Decimal(cart.tax_fee)
            total_service_fee += Decimal(cart.service_fee)
            total_sub_total += Decimal(cart.sub_total)
            total_initial_total += Decimal(cart.total)
            total_total += Decimal(cart.total)

            new_order.vendor.add(cart.product.vendor)

            new_order.sub_total = total_sub_total
            new_order.shipping_amount = total_shipping_amount
            new_order.tax_fee = total_tax_fee
            new_order.service_fee = total_service_fee
            new_order.initial_total = total_initial_total
            new_order.total = total_total

            new_order.save()

        return Response(
            {"message": "Order created successfully", "order_oid": new_order.oid},
            status=status.HTTP_201_CREATED,
        )
