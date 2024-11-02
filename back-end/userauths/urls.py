from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from userauths import views as userauths_views


urlpatterns = [
    # sakht 'url' baraye 'JWT token' vase 'login' user.
    path("register/", userauths_views.RegisterJWTView.as_view(), name="user_register_jwt"),
    path("login/token/", userauths_views.JWTTokenView.as_view(), name="user_login_jwt_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="user_refresh_jwt"),
    path("password-reset/<email>/", userauths_views.PasswordResetEmailVerifyView.as_view(), name="user_password_reset"),
    path("password-change/", userauths_views.ChangePasswordView.as_view(), name="user_password_change"),
]
