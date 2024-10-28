from django.urls import path

from userauths import views as userauths_views


urlpatterns = [
    # sakht 'url' baraye 'JWT token' vase 'login' user.
    path("user/token/", userauths_views.JWTTokenView.as_view(), name="user_login_jwt_token"),
    path("user/register/", userauths_views.RegisterJWTView.as_view(), name="user_register_jwt"),
]
