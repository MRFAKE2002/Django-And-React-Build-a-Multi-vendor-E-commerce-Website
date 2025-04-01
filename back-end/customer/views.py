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
    user_id = self.kwargs['user_id']
    
    user = User.objects.get(id=user_id)
    
    return Order.objects.filter(buyer=user)


class OrderRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs.get("user_id")  # استفاده از get برای جلوگیری از KeyError
        order_oid = self.kwargs.get("order_oid")

        if not user_id or not order_oid:
            return Response({"detail": "user_id and order_oid are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            return Order.objects.prefetch_related("order_items").get(buyer=user, oid=order_oid)
        except ObjectDoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
