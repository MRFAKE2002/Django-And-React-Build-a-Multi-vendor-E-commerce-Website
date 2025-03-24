# Django
from django.urls import path

# My apps
from . import views as store_views


urlpatterns = [
    path("categories/", store_views.CategoryListAPIView.as_view(), name="categories_list"),
    path("products/", store_views.ProductListAPIView.as_view(), name="products_list"),
    path("product/<slug>/", store_views.ProductDetailAPIView.as_view(), name="products_detail"),
    path("cart/", store_views.CartListCreateAPIView.as_view(), name="cart_list_create"),
    path("cart-list/<str:cart_id>/<int:user_id>/", store_views.CartListAPIView.as_view(), name="cart_list_with_user_id"),
    path("cart-list/<str:cart_id>/", store_views.CartListAPIView.as_view(), name="cart_list_without_user_id"),
    path("cart-detail/<str:cart_id>/<int:user_id>/", store_views.CartDetailAPIView.as_view(), name="cart_detail_with_user_id"),
    path("cart-detail/<str:cart_id>/", store_views.CartDetailAPIView.as_view(), name="cart_detail_without_user_id"),
    path("cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>/", store_views.CartDeleteAPIView.as_view(), name="cart_delete_with_user_id"),
    path("cart-delete/<str:cart_id>/<int:item_id>/", store_views.CartDeleteAPIView.as_view(), name="cart_delete_without_user_id"),
    path("create-order/", store_views.CreateOrderAPIView.as_view(), name="create_order"),
    path("checkout/<order_oid>/", store_views.OrderCheckoutAPIView.as_view(), name="checkout"),
    path("coupon/", store_views.CreateCouponAPIView.as_view(), name="create_coupon"),
    
    # payment
    path("stripe-checkout/<order_oid>/", store_views.StripeCheckoutAPIView.as_view(), name="stripe-checkout"),
    path("payment-success/<order_oid>/", store_views.PaymentSuccessAPIView.as_view(), name="payment-success"),
]
