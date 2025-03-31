from django.urls import path

from . import views as customer_views

urlpatterns = [
    # Order | List & Detail
    path(
        "orders/<user_id>/",
        customer_views.OrderListAPIView.as_view(),
        name="order_list_authentication",
    ),
    path(
        "order/<user_id>/<order_oid>/",
        customer_views.OrderRetrieveAPIView.as_view(),
        name="order_detail_authentication",
    ),
]
