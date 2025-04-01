from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from userauths import views as userauths_views


urlpatterns = [
    #! Register
    # sakht 'url' baraye 'JWT token' vase 'login' user.
    path(
        "register/", userauths_views.RegisterJWTView.as_view(), name="user_register_jwt"
    ),
    # ! Login
    path(
        "login/token/",
        userauths_views.JWTTokenView.as_view(),
        name="user_login_jwt_token",
    ),
    #! Refresh Token
    path("token/refresh/", TokenRefreshView.as_view(), name="user_refresh_jwt"),
    #! Password Reset
    path(
        "password-reset/<email>/",
        userauths_views.PasswordResetEmailVerifyView.as_view(),
        name="user_password_reset",
    ),
    path(
        "password-change/",
        userauths_views.CreateNewPasswordView.as_view(),
        name="user_password_change",
    ),
    #! User Profile
    path(
        "user/profile/<user_id>/",
        userauths_views.ProfileDetailAPIView.as_view(),
        name="profile_detail",
    ),
]
