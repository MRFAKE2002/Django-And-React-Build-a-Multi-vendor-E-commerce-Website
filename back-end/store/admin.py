# Django
from django.contrib import admin

# My apps
from .models import (
    Category,
    Product,
    Gallery,
    ProductFAQ,
    Specification,
    Size,
    Color,
    Cart,
    Order,
    OrderItem,
    Review,
    WishList,
    Notification,
    Coupon,
)


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

    fields = ("image", "gid", "active")

    extra = 1


class SpecificationTabularInline(admin.TabularInline):
    model = Specification

    fields = ("title", "content")

    extra = 1


class ColorTabularInline(admin.TabularInline):
    model = Color

    fields = ("name", "color_code")

    extra = 1


class SizeTabularInline(admin.TabularInline):
    model = Size

    fields = ("name", "price")

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
        "product_rating",
        "rating_count",
        "datetime_created",
    ]

    list_editable = [
        "in_stock",
        "status",
        "featured",
        "price",
        "old_price",
        "shipping_amount",
        "stock_quantity",
    ]

    search_fields = ["name", "vendor"]

    list_per_page = 10

    list_filter = ["in_stock", "status", "featured", "datetime_created"]

    prepopulated_fields = {"slug": ["name"]}

    list_select_related = ["vendor", "category"]

    inlines = [
        GalleryTabularInline,
        SpecificationTabularInline,
        ColorTabularInline,
        SizeTabularInline,
    ]


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ["image", "gid", "product", "active", "datetime_created"]

    list_editable = ["active", "gid"]

    search_fields = ["product"]

    list_select_related = ["product"]

    list_filter = ["active"]

    list_per_page = 10


@admin.register(Specification)
class SpecificationAdmin(admin.ModelAdmin):
    list_display = ["product", "title", "content", "datetime_created"]

    search_fields = ["product"]

    list_select_related = ["product"]

    list_per_page = 10


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ["product", "name", "color_code", "datetime_created"]

    search_fields = ["product", "name", "color_code"]

    list_select_related = ["product"]

    list_per_page = 10


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ["product", "name", "price", "datetime_created"]

    search_fields = ["product", "name"]

    list_editable = ["price"]

    list_select_related = ["product"]

    list_per_page = 10


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = [
        "cart_id",
        "user",
        "product",
        "size",
        "color",
        "quantity",
        "price",
        "sub_total",
        "shipping_amount",
        "service_fee",
        "tax_fee",
        "total",
        "country",
        "datetime_created",
    ]

    search_fields = ["product", "color", "size", "country"]

    list_editable = ["shipping_amount", "service_fee", "tax_fee"]

    list_select_related = ["product", "user"]

    list_per_page = 10

    list_filter = ["datetime_created", "country"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "oid",
        "buyer",
        "sub_total",
        "shipping_amount",
        "service_fee",
        "tax_fee",
        "total",
        "initial_total",
        "saved",
        "full_name",
        "email",
        "mobile",
        "address",
        "city",
        "state",
        "country",
        "payment_status",
        "order_status",
        "datetime_created",
    ]

    search_fields = [
        "buyer",
        "full_name",
        "email",
        "mobile",
        "address",
        "city",
        "state",
        "country",
    ]

    list_editable = ["payment_status", "order_status"]

    list_select_related = ["buyer"]

    list_per_page = 10

    list_filter = ["datetime_created", "country"]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = [
        "oid",
        "order",
        "vendor",
        "product",
        "size",
        "color",
        "quantity",
        "price",
        "sub_total",
        "shipping_amount",
        "service_fee",
        "tax_fee",
        "total",
        "initial_total",
        "saved",
        "datetime_created",
    ]

    search_fields = [
        "product",
        "vendor",
        "buyer",
        "datetime_created",
    ]

    list_select_related = ["product", "vendor", "order"]

    list_per_page = 10

    list_filter = ["datetime_created"]


@admin.register(ProductFAQ)
class ProductFAQAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "product",
        "email",
        "question",
        "answer",
        "active",
        "datetime_created",
    ]

    search_fields = [
        "product",
        "user",
        "email",
        "question",
        "answer",
        "datetime_created",
    ]

    list_select_related = ["product", "user"]

    list_per_page = 10

    list_filter = ["datetime_created", "active"]

    list_editable = ["active"]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "product",
        "review",
        "reply",
        "rating",
        "active",
        "datetime_created",
    ]

    search_fields = [
        "product",
        "user",
        "review",
        "reply",
        "datetime_created",
    ]

    list_select_related = ["product", "user"]

    list_per_page = 10

    list_filter = ["datetime_created", "active", "rating"]

    list_editable = ["active"]


@admin.register(WishList)
class WishListAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "product",
        "datetime_created",
    ]

    search_fields = [
        "product",
        "user",
        "datetime_created",
    ]

    list_select_related = ["product", "user"]

    list_per_page = 10

    list_filter = ["datetime_created"]


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "vendor",
        "order",
        "order_item",
        "seen",
        "datetime_created",
    ]

    search_fields = [
        "user",
        "vendor",
        "datetime_created",
    ]

    list_select_related = ["user", "vendor", "order", "order_item"]

    list_per_page = 10

    list_filter = ["datetime_created"]


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = [
        "vendor",
        "code",
        "discount",
        "active",
        "datetime_created",
    ]

    search_fields = [
        "vendor",
        "code",
        "discount",
        "datetime_created",
    ]

    list_select_related = ["vendor"]

    list_per_page = 10

    list_filter = ["datetime_created"]

    list_editable = ["active"]
