from django.urls import path

from . import views as customer_views

urlpatterns = [
    #! Order | List & Detail
    path(
        "orders/<user_id>/",
        customer_views.OrderListAPIView.as_view(),
        name="order_list_authentication",
    ),
    path(
        "order/detail/<user_id>/<order_oid>/",
        customer_views.OrderRetrieveAPIView.as_view(),
        name="order_detail_authentication",
    ),
    #! WishList | Create & List
    path(
        "wishlist/create/",
        customer_views.WishListCreateAPIView.as_view(),
        name="wishlist_create_authentication",
    ),
    path(
        "wishlist/<user_id>/",
        customer_views.WishListAPIView.as_view(),
        name="wishlist_authentication",
    ),
    #! Notification | List & Detail
    path(
        "notifications/<user_id>/",
        customer_views.CustomerNotificationsListAPIView.as_view(),
        name="notifications_list_authentication",
    ),
    # TODO path(
    # TODO     "notification/<user_id>/<notification_id>/",
    # TODO     customer_views.CustomerMakeNotificationAPIView.as_view(),
    # TODO     name="mark_notification_authentication",
    # TODO ),
]
