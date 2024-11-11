# Django
from django.shortcuts import render

# Libraries
from rest_framework import generics
from rest_framework.permissions import AllowAny

# My apps
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


# dar inja ma miaim 'data' marbut be 'Product' ro be surat 'list' namayesh midim.
class ProductListAPIView(generics.ListAPIView):
  queryset = Product.objects.all()
  serializer_class= ProductSerializer
  permission_classes = [AllowAny]


# dar inja ma miaim 'data' marbut be 'Category' ro be surat 'list' namayesh midim.
class CategoryListAPIView(generics.ListAPIView):
  queryset = Category.objects.all()
  serializer_class= CategorySerializer
  permission_classes = [AllowAny]


# dar inja ma miaim 'data' marbut be 'Product' khasi ro ke 'slug' az 'url' gereftim ro be surat 'detail' namayesh midim.
class ProductDetailAPIView(generics.RetrieveAPIView):
  serializer_class= ProductSerializer
  permission_classes = [AllowAny]

  def get_object(self):
    # inja ma mikhaim 'data' oun 'product' khasi ro ke 'slug' az 'url' gereftim ba estefade az 'query' zadan 'return' mikonim.
    
    slug = self.kwargs["slug"]
    
    return Product.objects.get(slug=slug)

