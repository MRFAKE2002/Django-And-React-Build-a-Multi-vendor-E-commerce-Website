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
  lookup_field = "order_oid"
  
  def get_object(self):
    user_id = self.kwargs["user_id"]
  
    order_oid = self.kwargs["order_oid"]
  
    user = User.objects.get(id=user_id)
    return Order.objects.get(buyer=user, oid=order_oid)

