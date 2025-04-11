# Django
from django.db.models import F, Sum, Count
from django.db.models.functions import ExtractMonth

# Libraries
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.decorators import api_view

from datetime import datetime, timedelta

# My Apps
from .serializers import EarningRevenueSerializers, SummarySerializers
from .models import Vendor
from store.models import Order, OrderItem, Product, Review
from store.serializers import (
    OrderItemSerializer,
    OrderSerializer,
    ProductSerializer,
    ReviewSerializer,
)

# ---------------------------------------------Stats List View ------------------------------------------ #


class SummaryStatsAPIView(generics.ListAPIView):
    serializer_class = SummarySerializers
    permission_classes = [AllowAny]

    def get_queryset(self):
        vendor_id = self.kwargs.get("vendor_id")

        if not vendor_id or vendor_id == "undefined":
            raise ValidationError({"message": "Vendor ID is missing."})

        try:
            vendor = Vendor.objects.get(id=vendor_id)
        except Vendor.DoesNotExist as e:
            raise NotFound({"message": "Vendor not found."}) from e

        #! calculate the summary values
        product_count = Product.objects.filter(vendor=vendor).count()
        order_count = Order.objects.filter(vendor=vendor, payment_status="paid").count()
        revenue = (
            OrderItem.objects.select_related("order")
            .filter(vendor=vendor, order__payment_status="paid")
            .aggregate(total_revenue=Sum(F("sub_total") + F("shipping_amount")))[
                "total_revenue"
            ]
            or 0
        )

        return [{"products": product_count, "orders": order_count, "revenue": revenue}]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)


# ---------------------------------------------Order Product Monthly Chart View ------------------------------------------ #


@api_view(["GET"])
def MonthlyOrdersChartAPIView(request, vendor_id):
    if not vendor_id or vendor_id == "undefined":
        raise ValidationError({"message": "Vendor ID is missing."})

    try:
        vendor = Vendor.objects.get(id=vendor_id)
    except Vendor.DoesNotExist as e:
        raise NotFound({"message": "Vendor not found."}) from e

    try:
        orders = Order.objects.select_related("vendor").filter(
            vendor=vendor, payment_status="paid"
        )
    except Order.DoesNotExist as e:
        raise NotFound({"message": "Order not found."}) from e

    orders_by_months = (
        orders.annotate(month=ExtractMonth("datetime_created"))
        .values("month")
        .annotate(orders=Count("id"))
        .order_by("month")
    )

    return Response(orders_by_months)


@api_view(["GET"])
def MonthlyProductsChartAPIView(request, vendor_id):
    if not vendor_id or vendor_id == "undefined":
        raise ValidationError({"message": "Vendor ID is missing."})

    try:
        vendor = Vendor.objects.get(id=vendor_id)
    except Vendor.DoesNotExist as e:
        raise NotFound({"message": "Vendor not found."}) from e

    try:
        products = Product.objects.select_related("vendor").filter(vendor=vendor)
    except Product.DoesNotExist as e:
        raise NotFound({"message": "Product not found."}) from e

    products_by_months = (
        products.annotate(month=ExtractMonth("datetime_created"))
        .values("month")
        .annotate(orders=Count("id"))
        .order_by("month")
    )

    return Response(products_by_months)


# ---------------------------------------------Product List View ------------------------------------------ #


class ProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        vendor_id = self.kwargs.get("vendor_id")

        if not vendor_id or vendor_id == "undefined":
            raise ValidationError({"message": "Vendor ID is missing."})

        try:
            vendor = Vendor.objects.get(id=vendor_id)
        except Vendor.DoesNotExist as e:
            raise NotFound({"message": "Vendor not found."}) from e

        try:
            products = Product.objects.select_related("vendor").filter(vendor=vendor)
        except Product.DoesNotExist as e:
            raise NotFound({"message": "Product not found."}) from e

        return products


# ---------------------------------------------Filter Product List View ------------------------------------------ #


class FilterProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        vendor_id = self.kwargs.get("vendor_id")
        if not vendor_id or vendor_id == "undefined":
            raise ValidationError({"message": "Vendor ID is missing."})
        filter = self.request.GET.get("filter")
        if not filter:
            raise ValidationError({"message": "filter attribute is missing."})

        # print("filter =======", filter)

        vendor = Vendor.objects.get(id=vendor_id)
        if filter == "published":
            products = Product.objects.filter(vendor=vendor, status="published")
        elif filter == "draft":
            products = Product.objects.filter(vendor=vendor, status="draft")
        elif filter == "disabled":
            products = Product.objects.filter(vendor=vendor, status="disabled")
        elif filter == "in-review":
            products = Product.objects.filter(vendor=vendor, status="in-review")
        elif filter == "latest":
            products = Product.objects.filter(vendor=vendor).order_by("-id")
        elif filter == "oldest":
            products = Product.objects.filter(vendor=vendor).order_by("id")
        else:
            products = Product.objects.filter(vendor=vendor)
        return products


# ---------------------------------------------Order List View ------------------------------------------ #


class OrdersAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        vendor_id = self.kwargs.get("vendor_id")
        if not vendor_id or vendor_id == "undefined":
            raise ValidationError({"message": "Vendor ID is missing."})

        order_oid = self.kwargs.get("order_oid")
        if not order_oid or order_oid == "undefined":
            raise ValidationError({"message": "Order OID is missing."})

        try:
            vendor = Vendor.objects.get(id=vendor_id)
        except Vendor.DoesNotExist as e:
            raise NotFound({"message": "Vendor not found."}) from e

        try:
            orders = Order.objects.select_related("vendor").filter(
                vendor=vendor, oid=order_oid, payment_status="paid"
            )
        except Order.DoesNotExist as e:
            raise NotFound({"message": "Order not found."}) from e

        return orders


# ---------------------------------------------OrderItem Revenue List View ------------------------------------------ #


class RevenueAPIView(generics.ListAPIView):
    serializer_class = OrderItemSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        vendor_id = self.kwargs.get("vendor_id")
        if not vendor_id or vendor_id == "undefined":
            raise ValidationError({"message": "Vendor ID is missing."})

        try:
            vendor = Vendor.objects.get(id=vendor_id)
        except Vendor.DoesNotExist as e:
            raise NotFound({"message": "Vendor not found."}) from e

        revenue = (
            OrderItem.objects.select_related("order")
            .filter(vendor=vendor, order__payment_status="paid")
            .aggregate(total_revenue=Sum(F("sub_total") + F("shipping_amount")))[
                "total_revenue"
            ]
            or 0
        )

        return revenue


# ---------------------------------------------Earing Month Revenue List View ------------------------------------------ #


class EarningLastMonthRevenueAPIView(generics.ListAPIView):
    serializer_class = EarningRevenueSerializers
    permission_classes = [AllowAny]

    def get_queryset(self):

        vendor_id = self.kwargs.get("vendor_id")
        if not vendor_id or vendor_id == "undefined":
            raise ValidationError({"message": "Vendor ID is missing."})
        
        vendor = Vendor.objects.get(id=vendor_id)
        if not vendor:
            raise ValidationError({"message": "Vendor attribute is missing."})

        one_month_ago = datetime.today() - timedelta(days=28)
        monthly_revenue = (
            OrderItem.objects.select_related("order")
            .filter(
                vendor=vendor,
                order__payment_status="paid",
                datetime_created__gte=one_month_ago,
            )
            .aggregate(total_revenue=Sum(F("sub_total") + F("shipping_amount")))[
                "total_revenue"
            ]
            or 0
        )
        total_revenue = (
            OrderItem.objects.select_related("order")
            .filter(vendor=vendor, order__payment_status="paid")
            .aggregate(total_revenue=Sum(F("sub_total") + F("shipping_amount")))[
                "total_revenue"
            ]
            or 0
        )

        return [
            {
                "monthly_revenue": monthly_revenue,
                "total_revenue": total_revenue,
            }
        ]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# ---------------------------------------------Earing Monthly Revenue Tracker View ------------------------------------------ #


@api_view(("GET",))
def MonthlyEarningTracker(request, vendor_id):
    if not vendor_id or vendor_id == "undefined":
        raise ValidationError({"message": "Vendor ID is missing!"})

    try:
        vendor = Vendor.objects.get(id=vendor_id)
    except Vendor.DoesNotExist as e:
        raise NotFound({"message": "Vendor not found."}) from e

    monthly_earning_tracker = (
        OrderItem.objects.select_related("order").filter(vendor=vendor, order__payment_status="paid")
        .annotate(month=ExtractMonth("datetime_created"))
        .values("month")
        .annotate(
            sales_count=Sum("quantity"),
            total_earning=Sum(F("sub_total") + F("shipping_amount")),
        )
        .order_by("-month")
    )
    return Response(monthly_earning_tracker)


