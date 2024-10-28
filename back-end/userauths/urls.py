from django.urls import path

from userauths import views as userauths_views


urlpatterns = [
    # sakht 'url' baraye 'JWT token' vase 'login' user.
    path("user/token/", userauths_views.JWTTokenView.as_view(), name="user_jwt_token"),
]
