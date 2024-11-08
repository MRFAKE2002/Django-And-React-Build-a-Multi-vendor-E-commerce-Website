# Django
from django.contrib import admin

# My apps
from .models import Category, Product, Gallery, Specification, Size, Color


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["image", "title", "active"]

    prepopulated_fields = {"slug": ["title"]}

    list_editable = ["active"]

    list_per_page = 10

    list_filter = ["active"]

    ordering = ["id", "title"]

    search_fields = ["title"]



class GalleryTabularInline(admin.TabularInline):
    model = Gallery
    
    fields = ("image", "gid","active")

    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "image",
        "vendor",
        "name",
        "category",
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
    
    list_select_related = ["vendor", "category"]

    inlines = [GalleryTabularInline]


class GalleryAdmin(admin.ModelAdmin):
    list_display = ["image", "gid", "product", "active"]
    
    list_editable = ["active"]
    
    search_fields = ["product"]
    
    list_select_related = ["product"]
    
    list_per_page = 10
