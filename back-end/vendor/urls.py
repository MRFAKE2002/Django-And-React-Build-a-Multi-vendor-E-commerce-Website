# Libraries
from django.urls import path

# My Apps
from . import views as vendor_views


urlpatterns = [
    #! Stats | List
    path(
        "stats/<vendor_id>/",
        vendor_views.SummaryStatsAPIView.as_view(),
        name="vendor_stats",
    ),
    #! Order & Product | Monthly Chart 
    path(
        "vendor-orders-chart/<vendor_id>/",
        vendor_views.MonthlyOrdersChartAPIView,
        name="monthly_orders_chart",
    ),
    path(
        "vendor-products-chart/<vendor_id>/",
        vendor_views.MonthlyProductsChartAPIView,
        name="monthly_products_chart",
    )
]
