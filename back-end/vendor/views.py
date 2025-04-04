# Django
from django.db.models import F, Sum

# Libraries
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

# My Apps
from .serializers import SummarySerializers
from .models import Vendor
from store.models import Order, OrderItem, Product

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

    def list(self):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        return Response(serializer.data)

