# Django
from django.urls import path

# Libraries
from rest_framework_simplejwt.views import TokenRefreshView

# My Apps
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
        "profile/<user_id>/",
        userauths_views.ProfileDetailUpdateAPIView.as_view(),
        name="profile_detail_update",
    ),
]
