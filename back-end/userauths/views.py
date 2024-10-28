from django.shortcuts import render

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import User, Profile
from .serializer import JWTTokenSerializer, RegisterSerializer

class JWTTokenView(TokenObtainPairView):
  """
    in 'view' baraye 'login user' ke shoma 'email va password' midi behet 'access va refresh token' mide.
  """
  serializer_class = JWTTokenSerializer


class RegisterJWTView(generics.CreateAPIView):
  """
    in 'view' baraye 'register user' ke shoma 'fullname va  va phone va password' midi barat 'user' misaze.
  """
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  
  # dar inja chon niazi be authentication nadarim yani lazem nist kasi login kone chon mikhaim user besazim pas bayad dastresi be hame bedim.
  permission_classes = (AllowAny, )
