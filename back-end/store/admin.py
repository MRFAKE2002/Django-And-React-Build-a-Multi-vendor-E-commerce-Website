# Django
from django.contrib import admin

# My apps
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["image", "title", "active"]

    prepopulated_fields = {"slug": ["title"]}

    list_editable = ["active"]

    list_per_page = 10

    list_filter = ["active"]

    ordering = ["id", "title"]

    search_fields = ["title"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "image",
        "name",
        "vendor",
        "price",
        "old_price",
        "shipping_amount",
        "stock_quantity",
        "in_stock",
        "status",
        "featured",
        "views",
        "rating",
    ]

    list_editable = ["in_stock", "status", "featured"]

    search_fields = ["name", "vendor"]

    list_per_page = 10

    list_filter = ["in_stock", "status", "featured", "datetime_created"]

    prepopulated_fields = {"slug": ["name"]}
