from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from userauths import views as userauths_views


urlpatterns = [
    # sakht 'url' baraye 'JWT token' vase 'login' user.
    path("user/register/", userauths_views.RegisterJWTView.as_view(), name="user_register_jwt"),
    path("user/login/token/", userauths_views.JWTTokenView.as_view(), name="user_login_jwt_token"),
    path("user/token/refresh/", TokenRefreshView.as_view(), name="user_refresh_jwt"),
]
