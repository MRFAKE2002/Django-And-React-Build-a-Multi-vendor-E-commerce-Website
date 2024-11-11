# Django
from django.urls import path

# My apps
from . import views as store_views


urlpatterns = [
    path("category/", store_views.CategoryListAPIView.as_view(), name="categories_list"),
    path("product/", store_views.ProductListAPIView.as_view(), name="products_list"),
    path("product/<slug>/", store_views.ProductDetailAPIView.as_view(), name="products_detail"),
]
