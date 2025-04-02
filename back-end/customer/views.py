# Django
from django.conf import settings
from django.shortcuts import redirect
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.core.exceptions import ObjectDoesNotExist

# Libraries
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from decimal import Decimal

# My apps
from store.models import (
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

from store.serializers import (
    CategorySerializer,
    OrderSerializer,
    ProductSerializer,
    CartSerializer,
    ReviewSerializer,
)

from userauths.models import User


class OrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]

        user = User.objects.get(id=user_id)

        return Order.objects.filter(buyer=user)


class OrderRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    lookup_field = "user_id"

    def get_object(self):
        user_id = self.kwargs.get("user_id")
        order_oid = self.kwargs.get("order_oid")

        # بررسی مقدار user_id و order_oid
        if not user_id or not order_oid:
            return Response(
                {"detail": "User ID or Order OID is missing."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(id=user_id)
            return Order.objects.prefetch_related("order_items").get(
                buyer=user, oid=order_oid
            )
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
