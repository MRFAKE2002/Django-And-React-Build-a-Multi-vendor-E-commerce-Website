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
    #! Products & Filter Products | List
    path(
        "products/<vendor_id>/",
        vendor_views.ProductsAPIView.as_view(),
        name="vendor_products_list",
    ),
    path(
        "filter-products/<vendor_id>/",
        vendor_views.FilterProductsAPIView.as_view(),
        name="vendor_filter_products_list",
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
        name="vendor_last_month_revenue_list",
    ),
    #! OrderItems Monthly Revenue Tracker
    path(
        "monthly-revenue/<vendor_id>/",
        vendor_views.MonthlyEarningTracker,
        name="vendor_monthly_revenue_list",
    ),
    #! Review | List & Detail & Update
    path(
        "reviews/<vendor_id>/",
        vendor_views.ReviewsListAPIView.as_view(),
        name="vendor__reviews_list",
    ),
    path(
        "review/<vendor_id>/<review_id>/",
        vendor_views.ReviewsDetailUpdateAPIView.as_view(),
        name="vendor_revenue_Detail_update",
    ),
]
