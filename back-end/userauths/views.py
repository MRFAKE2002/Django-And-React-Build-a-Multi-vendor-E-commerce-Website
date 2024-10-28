from django.shortcuts import render

from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Profile
from .serializer import JWTTokenSerializer, RegisterSerializer

class JWTTokenView(TokenObtainPairView):
  serializer_class = JWTTokenSerializer
