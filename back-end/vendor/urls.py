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
        "vendor-orders-report-chart/<vendor_id>/",
        vendor_views.MonthlyOrdersChartAPIView,
        name="monthly_orders_chart",
    ),
    path(
        "vendor-products-report-chart/<vendor_id>/",
        vendor_views.MonthlyProductsChartAPIView,
        name="monthly_products_chart",
    ),
    #! Products | List
    path(
        "products/<vendor_id>/",
        vendor_views.ProductsAPIView.as_view(),
        name="vendor_products_list",
    ),
    #! Filter Products | List
    path(
        "products/<vendor_id>/",
        vendor_views.ProductsAPIView.as_view(),
        name="vendor_products_list",
    ),
    #! Orders | List
    path(
        "orders/<vendor_id>/<order_oid>/",
        vendor_views.OrdersAPIView.as_view(),
        name="vendor_orders_list",
    ),
    #! OrderItems Revenue | List
    path(
        "revenue/<vendor_id>/",
        vendor_views.RevenueAPIView.as_view(),
        name="vendor_revenue_list",
    ),
    #! OrderItems Last Month Revenue | List
    path(
        "last-month-revenue/<vendor_id>/",
        vendor_views.EarningLastMonthRevenueAPIView.as_view(),
        name="vendor_revenue_list",
    ),
    #! OrderItems Monthly Revenue Tracker
    path(
        "monthly-revenue/<vendor_id>/",
        vendor_views.MonthlyEarningTracker,
        name="vendor_revenue_list",
    ),
]
