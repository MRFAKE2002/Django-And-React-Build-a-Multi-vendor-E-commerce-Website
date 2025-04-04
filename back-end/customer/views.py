# Libraries
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

# My apps
from store.models import (
    Notification,
    Order,
    Product,
    WishList,
)

from store.serializers import (
    NotificationSerializer,
    OrderSerializer,
    WishListSerializer,
)

from userauths.models import User

# ---------------------------------------------Order List Detail View ------------------------------------------ #


class OrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")

        # بررسی مقدار user_id
        if not user_id or user_id == "undefined":
            raise ValidationError({"detail": "User ID is missing."})

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist as e:
            raise NotFound({"detail": "User not found."}) from e

        queryset = Order.objects.prefetch_related("order_items").filter(buyer=user)

        if not queryset.exists():
            raise NotFound({"detail": "No orders found for this user."})

        return queryset


class OrderRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    lookup_field = "order_oid"

    def get_object(self):
        user_id = self.kwargs.get("user_id")
        order_oid = self.kwargs.get("order_oid")

        # بررسی مقدار user_id و order_oid
        if not user_id or not order_oid:
            raise ValidationError({"detail": "User ID or Order OID is missing."})

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist as e:
            raise NotFound({"detail": "User not found."}) from e

        try:
            order = Order.objects.prefetch_related("order_items").get(
                buyer=user, oid=order_oid
            )
        except Order.DoesNotExist as exc:
            raise NotFound({"detail": "Order not found."}) from exc

        return order


# ---------------------------------------------Wishlist Create List View ------------------------------------------ #


class WishListCreateAPIView(generics.CreateAPIView):
    serializer_class = WishListSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        payload = request.data

        product_id = payload.get("product_id")
        user_id = payload.get("user_id")

        if not user_id or user_id == "undefined":
            return Response(
                {"message": "User ID is missing!"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            product = Product.objects.get(id=product_id)

            user = User.objects.get(id=user_id)

            if wishlist := WishList.objects.filter(product=product, user=user):
                wishlist.delete()
                return Response(
                    {"message": "Wishlist deleted successfully."},
                    status=status.HTTP_200_OK,
                )
            else:
                WishList.objects.create(product=product, user=user)
                return Response(
                    {"message": "Added to wishlist."},
                    status=status.HTTP_201_CREATED,
                )
        except user.DoesNotExist:
            return Response(
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except product.DoesNotExist:
            return Response(
                {"message": "Product not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class WishListAPIView(generics.ListAPIView):
    serializer_class = WishListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")

        if not user_id or user_id == "undefined":
            return Response(
                {"message": "User ID is missing!"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=user_id)
            return WishList.objects.select_related("product", "user").filter(user=user)
        except user.DoesNotExist:
            return Response(
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# ---------------------------------------------Notification List Detail View ------------------------------------------ #


class CustomerNotificationsListAPIView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")

        if not user_id or user_id == "undefined":
            return Response(
                {"message": "User ID is missing!"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=user_id)
            return Notification.objects.select_related(
                "vendor", "user", "order", "order_item"
            ).filter(user=user)
        except user.DoesNotExist:
            return Response(
                {"message": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# TODO class CustomerMakeNotificationAPIView(generics.RetrieveAPIView):
#     serializer_class = NotificationSerializer
#     permission_classes = [AllowAny]
#     lookup_field = "user_id"

#     def get_object(self):
#         user_id = self.kwargs.get("user_id")
#         notification_id = self.kwargs.get("notification_id")

#         # بررسی مقدار user_id و notification_id
#         if not user_id or user_id == "undefined" or not notification_id:
#             return Response(
#                 {"detail": "User ID or Notification ID is missing."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         try:
#             user = User.objects.get(id=user_id)
#             notification = Notification.objects.get(id=notification_id, user=user)
#             if notification.seen is not True:
#                 notification.seen = True
#                 notification.save()
#             return notification
#         except User.DoesNotExist:
#             return Response(
#                 {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
#             )
#         except Notification.DoesNotExist:
#             return Response(
#                 {"detail": "Notification not found."}, status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return Response(
#                 {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
