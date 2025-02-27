# Django

# Libraries
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from decimal import Decimal

# My apps
from .models import Category, Product, Cart, Tax
from .serializers import CategorySerializer, ProductSerializer, CartSerializer
from userauths.models import User

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


class CartListCreateAPIView(generics.ListCreateAPIView):
  """
    dakhel in 'class' ma mikhaim 'object Cart' besazim va ham betunim 'List object Cart' ro bebinim.
  """
  queryset = Cart.objects.all()
  serializer_class = CartSerializer
  permission_classes = [AllowAny]

  def create(self, request, *args, **kwargs):
    # dar inja oun data ke az samt 'Front' miad ro migirim ta betunim 'object Cart' besazim.

    # inja oun data ro az 'Front' migirim.
    payload = request.data

    cart_id = payload['cart_id']
    product_id = payload['product_id']
    user_id = payload['user_id']
    price = payload['product_price']
    shipping_amount = payload['product_shipping_amount']
    quantity = payload['quantity']
    size = payload['size']
    color = payload['color']
    country = payload['country']

    product = Product.objects.get(id=product_id)

    #? if user_id != "undefined":
    #?   user = User.objects.get(id=user_id)
    #? else:
    #?   user = None
    user = User.objects.get(id=user_id) if user_id != "undefined" else None

    #? tax = Tax.objects.filter(country=country).first()
    if tax := Tax.objects.filter(country=country).first():
      tax_rate = tax.rate / 100
    else:
      tax_rate = 0

    service_fee_percentage = 20 / 100
    if cart := Cart.objects.filter(cart_id=cart_id, product=product).first():
      cart.product = product
      cart.user = user
      cart.quantity = quantity
      cart.price = price
      cart.sub_total = Decimal(price) * int(quantity)
      cart.shipping_amount = Decimal(shipping_amount) * int(quantity)
      cart.tax_fee = Decimal(tax_rate) * int(quantity)
      cart.color = color
      cart.size = size
      cart.country = country
      cart.cart_id = cart_id

      cart.service_fee = Decimal(service_fee_percentage) * Decimal(cart.sub_total)

      cart.total = cart.sub_total + cart.shipping_amount + cart.service_fee + cart.tax_fee

      cart.save()

      return Response({"message": "Cart Updated Successfully"}, status = status.HTTP_200_OK)
    else:
      cart = Cart()

      cart.product = product
      cart.user = user
      cart.quantity = quantity
      cart.price = price
      cart.sub_total = Decimal(price) * int(quantity)
      cart.shipping_amount = Decimal(shipping_amount) * int(quantity)
      cart.tax_fee = Decimal(tax_rate) * int(quantity)
      cart.color = color
      cart.size = size
      cart.country = country
      cart.cart_id = cart_id

      cart.service_fee = Decimal(service_fee_percentage) * Decimal(cart.sub_total)

      cart.total = cart.sub_total + cart.shipping_amount + cart.service_fee + cart.tax_fee

      cart.save()

      return Response({"message": "Cart Updated Successfully"}, status = status.HTTP_201_CREATED)


class CartListAPIView(generics.ListAPIView):
  serializer_class = CartSerializer
  permission_classes = [AllowAny]
  
  def get_queryset(self):
    cart_id = self.kwargs['cart_id']
    
    # inja chon momkene 'user_id' nabashe baraye hamin 'get' mizanim ke 'error' nade.
    user_id = self.kwargs.get('user_id')
    
    if user_id is not None:
      queryset = Cart.objects.select_related('user').filter(user_id=user_id, cart_id=cart_id)
    else:
      queryset = Cart.objects.filter(cart_id=cart_id)

    return queryset

