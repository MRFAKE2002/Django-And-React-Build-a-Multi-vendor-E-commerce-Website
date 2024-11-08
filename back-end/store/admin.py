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

