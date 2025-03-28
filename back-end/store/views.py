# Django
from django.conf import settings
from django.shortcuts import redirect
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

# Libraries
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from decimal import Decimal
import stripe

# import requests

# My apps
from .models import (
    Category,
    Coupon,
    Notification,
    Order,
    OrderItem,
    Product,
    Cart,
    Review,
    Tax,
)
from .serializers import (
    CategorySerializer,
    OrderSerializer,
    ProductSerializer,
    CartSerializer,
    ReviewSerializer,
)
from userauths.models import User

# Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

# # Paypal
# PAYPAL_CLIENT_ID = settings.PAYPAL_CLIENT_ID
# PAYPAL_SECRET_ID = settings.PAYPAL_SECRET_ID


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

        """
            ma inja baraye inke bebinim age 'user' bashe bia 'Cart' ro ba dadan 'user' peida kon 
            agar ham 'user' nabud ke faghat az 'cart_id' estefade kon.
            
            hala baraye neveshtan in '3 model' mokhtalef darim :
            
            1- inja ke oumadim ye 'if else' sade zadim.
            2- inja mitunim oun shive 'if else' ro be surat 'Ternary Expression ya shart 3 khat' benevisim.
            3- inja ham miaim migim momkene 'user_id' meghdar 'None' nabashe vali dakhel 'DataBase' hamchin 'user' nabashe
            hala miaim az '** unpacking' estefade mikonim.
            
        """

        # ? if user_id is not None:
        # ?     queryset = Cart.objects.select_related("user").filter(
        # ?         user_id=user_id, cart_id=cart_id
        # ?     )
        # ? else:
        # ?     queryset = Cart.objects.filter(cart_id=cart_id)

        # ? return queryset

        # ? return (
        # ?     Cart.objects.select_related("user").filter(user_id=user_id, cart_id=cart_id)
        # ?     if user_id is not None
        # ?     else Cart.objects.filter(cart_id=cart_id)
        # ? )

        return Cart.objects.select_related("user").filter(
            cart_id=cart_id, **({"user_id": user_id} if user_id is not None else {})
        )


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

        # Use get() to handle cases where 'user_id' is not present
        user_id = self.kwargs.get("user_id")

        # ? if user_id is not None:
        # ?     # If 'user_id' is provided, filter the queryset by both 'cart_id' and 'user_id'
        # ?     user = User.objects.get(id=user_id)
        # ?     queryset = Cart.objects.select_related("user").filter(
        # ?         cart_id=cart_id, user=user
        # ?     )
        # ? else:
        # ?     # If 'user_id' is not provided, filter the queryset by 'cart_id' only
        # ?     queryset = Cart.objects.filter(cart_id=cart_id)

        # ? return queryset

        if user_id is None:
            # If 'user_id' is not provided, filter the queryset by 'cart_id' only
            return Cart.objects.filter(cart_id=cart_id)

        # If 'user_id' is provided, filter the queryset by both 'cart_id' and 'user_id'
        user = User.objects.filter(id=user_id).first()

        return (
            Cart.objects.select_related("user").filter(cart_id=cart_id, user=user)
            if user
            else Cart.objects.none()
        )

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

        # ? if user_id is not None:
        # ?     cart = Cart.objects.select_related("user").filter(
        # ?         id=item_id, cart_id=cart_id, user_id=user_id
        # ?     )
        # ? else:
        # ?     cart = Cart.objects.filter(id=item_id, cart_id=cart_id)

        # ? return cart

        return (
            Cart.objects.select_related("user").filter(
                id=item_id, cart_id=cart_id, user_id=user_id
            )
            if user_id is not None
            else Cart.objects.filter(id=item_id, cart_id=cart_id)
        )


class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = (AllowAny,)
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
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

        # ? if user_id == 0:
        # ?     user = None
        # ? else:
        # ?     user = User.objects.filter(id=user_id).first()
        user = None if user_id == 0 else User.objects.filter(id=user_id).first()

        cart_items = Cart.objects.select_related("product").filter(cart_id=cart_id)

        total_shipping_amount = Decimal(0.00)
        total_tax_fee = Decimal(0.00)
        total_service_fee = Decimal(0.00)
        total_sub_total = Decimal(0.00)
        total_initial_total = Decimal(0.00)
        total_total = Decimal(0.00)

        new_order = Order.objects.create(
            buyer=user,
            payment_status="processing",
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

            total_shipping_amount += Decimal(cart.shipping_amount or 0.00)
            total_tax_fee += Decimal(cart.tax_fee or 0.00)
            total_service_fee += Decimal(cart.service_fee or 0.00)
            total_sub_total += Decimal(cart.sub_total or 0.00)
            total_initial_total += Decimal(cart.total or 0.00)
            total_total += Decimal(cart.total or 0.00)

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


class OrderCheckoutAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    lookup_field = "order_oid"

    def get_object(self):
        order_oid = self.kwargs["order_oid"]
        return (
            Order.objects.prefetch_related("order_items")
            .select_related("buyer")
            .get(oid=order_oid)
        )


class CreateCouponAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        payload = request.data

        order_oid = payload["order_oid"]
        coupon_code = payload["coupon_code"]
        print("order_oid =======", order_oid)
        print("coupon_code =======", coupon_code)

        order = Order.objects.get(oid=order_oid)
        coupon = Coupon.objects.filter(code__exact=coupon_code, active=True).first()
        # if coupon:
        #     order_items = OrderItem.objects.filter(order=order, vendor=coupon.vendor)
        #     if order_items:
        #         for i in order_items:
        #             print("order_items =====", i.product.name)
        #             if coupon not in i.coupon.all():
        #                 discount = i.total * coupon.discount / 100

        #                 i.total -= discount
        #                 i.sub_total -= discount
        #                 i.coupon.add(coupon)
        #                 i.saved = (i.saved or Decimal("0")) + discount
        #                 # i.applied_coupon = True

        #                 # اگر مقدار None باشد، به جای آن مقدار 0 تنظیم می‌شود
        #                 order.total -= discount
        #                 order.sub_total -= discount
        #                 order.saved = (order.saved or Decimal("0")) + discount

        #                 i.save()
        #                 order.save()
        #                 return Response(
        #                     {"message": "Coupon Activated", "icon": "success"},
        #                     status=status.HTTP_200_OK,
        #                 )
        #             else:
        #                 return Response(
        #                     {"message": "Coupon Already Activated", "icon": "warning"},
        #                     status=status.HTTP_200_OK,
        #                 )
        #     return Response(
        #         {"message": "Order Item Does Not Exists", "icon": "error"},
        #         status=status.HTTP_200_OK,
        #     )
        # else:
        #     return Response(
        #         {"message": "Coupon Does Not Exists", "icon": "error"},
        #         status=status.HTTP_404_NOT_FOUND,
        #     )
        if not coupon:
            return Response(
                {"message": "Coupon Does Not Exists", "icon": "error"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if order_items := OrderItem.objects.filter(
                order=order, vendor=coupon.vendor
            ):
            for i in order_items:
                # print("order_items =====", i.product.name)
                return (
                    self._extracted_from_create_(i, coupon, order)
                    if coupon not in i.coupon.all()
                    else Response(
                        {"message": "Coupon Already Activated", "icon": "warning"},
                        status=status.HTTP_200_OK,
                    )
                )
        return Response(
            {"message": "Order Item Does Not Exists", "icon": "error"},
            status=status.HTTP_200_OK,
        )

    # TODO Rename this here and in `create`
    def _extracted_from_create_(self, i, coupon, order):
        discount = i.total * coupon.discount / 100

        i.total -= discount
        i.sub_total -= discount
        i.coupon.add(coupon)
        i.saved = (i.saved or Decimal("0")) + discount
        # i.applied_coupon = True

        # اگر مقدار None باشد، به جای آن مقدار 0 تنظیم می‌شود
        order.total -= discount
        order.sub_total -= discount
        order.saved = (order.saved or Decimal("0")) + discount

        i.save()
        order.save()
        return Response(
            {"message": "Coupon Activated", "icon": "success"},
            status=status.HTTP_200_OK,
        )


class StripeCheckoutAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        order_oid = self.kwargs["order_oid"]
        order = Order.objects.filter(oid=order_oid).first()

        if not order:
            return Response(
                {"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            checkout_session = stripe.checkout.Session.create(
                customer_email=order.email,
                payment_method_types=["card"],
                line_items=[
                    {
                        "price_data": {
                            "currency": "usd",
                            "product_data": {
                                "name": order.full_name,
                            },
                            "unit_amount": int(order.total * 100),
                        },
                        "quantity": 1,
                    }
                ],
                mode="payment",
                # success_url = f"{settings.SITE_URL}/payment-success/{{order.oid}}/?session_id={{CHECKOUT_SESSION_ID}}",
                # cancel_url = f"{settings.SITE_URL}/payment-success/{{order.oid}}/?session_id={{CHECKOUT_SESSION_ID}}",
                success_url=settings.SITE_URL
                + "/payment-success/"
                + order.oid
                + "?session_id={CHECKOUT_SESSION_ID}",
                cancel_url=settings.SITE_URL + "/?session_id={CHECKOUT_SESSION_ID}",
            )
            order.stripe_session_id = checkout_session.id
            order.save()

            return redirect(checkout_session.url)
        except stripe.error.StripeError as e:
            return Response(
                {
                    "error": f"Something went wrong when creating stripe checkout session: {str(e)}"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


def send_notification(user=None, vendor=None, order=None, order_item=None):
    Notification.objects.create(
        user=user,
        vendor=vendor,
        order=order,
        order_item=order_item,
    )


class PaymentSuccessAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        payload = request.data

        order_oid = payload["order_oid"]
        session_id = payload["session_id"]

        order = Order.objects.select_related("buyer").get(oid=order_oid)
        order_items = OrderItem.objects.select_related("vendor").filter(order=order)

        if session_id != "null":
            session = stripe.checkout.Session.retrieve(session_id)

            if session.payment_status == "paid":
                if order.payment_status == "processing":
                    order.payment_status = "paid"
                    order.save()

                    # send Notification for Buyer
                    if order.buyer is not None:
                        send_notification(user=order.buyer, order=order)

                    # send Notification for Buyer
                    for order_item in order_items:
                        send_notification(
                            vendor=order_item.vendor, order=order, order_item=order_item
                        )

                        # send Email to Vendor
                        context = {
                            "order": order,
                            "order_items": order_items,
                            "vendor": order_item.vendor,
                        }

                        email_subject = "New Sale"
                        text_body = render_to_string(
                            "email/vendor_order_sale.txt", context
                        )
                        html_body = render_to_string(
                            "email/vendor_order_sale.html", context
                        )

                        email_massage = EmailMultiAlternatives(
                            subject=email_subject,
                            from_email=settings.EMAIL_HOST_USER,
                            to=[order_item.vendor.user.email],
                            body=text_body,
                        )

                        email_massage.attach_alternative(html_body, "text/html")
                        email_massage.send()

                    # send Email to Buyer
                    context = {
                        "order": order,
                        "order_items": order_items,
                    }

                    email_subject = "Order Placed Successfully"
                    text_body = render_to_string(
                        "email/customer_order_confirmation.txt", context
                    )
                    html_body = render_to_string(
                        "email/customer_order_confirmation.html", context
                    )

                    email_massage = EmailMultiAlternatives(
                        subject=email_subject,
                        from_email=settings.EMAIL_HOST_USER,
                        to=[order.email],
                        body=text_body,
                    )

                    email_massage.attach_alternative(html_body, "text/html")
                    email_massage.send()

                    return Response({"message": "Payment Successful"})
                else:
                    return Response({"message": "Already Paid"})
            elif order.payment_status == "unpaid":
                return Response({"message": "Your Invoice Is Unpaid"})
            elif order.payment_status == "cancelled":
                return Response({"message": "Your Invoice Is cancelled"})
            else:
                return Response({"message": "An Error Occurred, Try Again..."})
        else:
            session = None


class CreateReviewAPIView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        payload = request.data

        user_id = payload["user_id"]
        product_id = payload["product_id"]
        rating = payload["rating"]
        review = payload["review"]

        user = User.objects.get(id=user_id)
        product = Product.objects.get(id=product_id)

        Review.objects.create(user=user, product=product, rating=rating, review=review)

        return Response(
            {"message": "Review Created Successfully."}, status=status.HTTP_201_CREATED
        )


class ReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        product_id = self.kwargs["product_id"]

        product = Product.objects.get(id=product_id)
        return Review.objects.filter(product=product)


class SearchProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        query = self.request.GET.get('query')
        # print("query =======", query)
        return Product.objects.filter(status="published", title__icontains=query)
