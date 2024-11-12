# libraries
from rest_framework import serializers

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
from userauths.serializer import UserSerializer, ProfileSerializer
from vendor.models import Vendor


class VendorSerializer(serializers.ModelSerializer):
    # Serialize related OrderItem models
    user = UserSerializer(read_only=True)

    class Meta:
        model = Vendor
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(VendorSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")

        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.
        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the Category model
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# Define a serializer for the Gallery model
class GallerySerializer(serializers.ModelSerializer):
    # Serialize the related Product model

    class Meta:
        model = Gallery
        fields = "__all__"


# Define a serializer for the Specification model
class SpecificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Specification
        fields = "__all__"


# Define a serializer for the Size model
class SizeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Size
        fields = "__all__"


# Define a serializer for the Color model
class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = "__all__"


# Define a serializer for the Product model
class ProductSerializer(serializers.ModelSerializer):
    """
        inja ma bayad havasemun bashe mikhaim oun field hayi ke dar yek model dige hastan va be ma foreignkey zadan 
        va ma mikhaim ounaro be surat prefetch_related namayesh bedim bayad bebinim oun related_name ke 
        moshakhas kardim chi bude ta eshtebahi ye name dige baraye namayesh oun field nazarim.
    """
    galleries = GallerySerializer(many=True, read_only=True)
    colors = ColorSerializer(many=True, read_only=True)
    sizes = SizeSerializer(many=True, read_only=True)
    specifications = SpecificationSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "image",
            "description",
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
            "vendor",
            "pid",
            "slug",
            "datetime_created",
            "galleries",
            "specifications",
            "sizes",
            "colors",
            "product_rating",
            "rating_count",
        ]

    def __init__(self, *args, **kwargs):
        super(ProductSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3

# Define a serializer for the ProductFaq model
class ProductFAQSerializer(serializers.ModelSerializer):
    # Serialize the related Product model
    product = ProductSerializer()

    class Meta:
        model = ProductFAQ
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(ProductFAQSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the OrderItem model
class CartSerializer(serializers.ModelSerializer):
    # Serialize the related Product model
    product = ProductSerializer()

    class Meta:
        model = Cart
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(CartSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the OrderItem model
class OrderItemSerializer(serializers.ModelSerializer):
    # Serialize the related Product model
    # product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(OrderItemSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the Order model
class OrderSerializer(serializers.ModelSerializer):
    # Serialize related OrderItem models
    order_item = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(OrderSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the Review model
class ReviewSerializer(serializers.ModelSerializer):
    # Serialize the related Product model
    product = ProductSerializer()
    profile = ProfileSerializer()

    class Meta:
        model = Review
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(ReviewSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the Wishlist model
class WishListSerializer(serializers.ModelSerializer):
    # Serialize the related Product model
    product = ProductSerializer()

    class Meta:
        model = WishList
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(WishListSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the Coupon model
class CouponSerializer(serializers.ModelSerializer):

    class Meta:
        model = Coupon
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(CouponSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3


# Define a serializer for the Notification model
class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        # request = self.context.get('request')
        # if request and request.method == 'POST':
        #     #! When creating a new product, set serialization depth to 0.
        #     self.Meta.depth = 0
        # else:
        #     #! For other methods, set serialization depth to 3.
        #     self.Meta.depth = 3

        # Customize serialization depth based on the request method.
        request = self.context.get("request")
        # inja migim age dakhel 'fields' yek 'foreignkey' vojud dasht bia 'data' marbut be oun 'field' ro ham neshun bede.

        self.Meta.depth = 0 if request and request.method == "POST" else 3
