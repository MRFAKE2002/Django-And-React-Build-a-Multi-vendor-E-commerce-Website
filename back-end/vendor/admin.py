# Django
from django.contrib import admin

# My apps
from .models import Vendor


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ["image", "user", "name", "mobile", "active"]

    prepopulated_fields = {"slug": ["name"]}
    
    autocomplete_fields = ["user"]
    
    list_editable = ["active"]
    
    list_per_page = 10
    
    list_select_related = ["user"]
    
    list_filter = ["active", "datetime_created"]
    
    ordering = ["id", "datetime_created"]
    
    search_fields = ["user", "name", "mobile"]
