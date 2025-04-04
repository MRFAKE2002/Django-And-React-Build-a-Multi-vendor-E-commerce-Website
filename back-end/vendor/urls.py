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
    )
]
