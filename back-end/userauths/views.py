from django.shortcuts import render

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import User, Profile
from .serializer import JWTTokenSerializer, RegisterSerializer, UserSerializer

import shortuuid

# ---------------------------------------------Login View ------------------------------------------ #

class JWTTokenView(TokenObtainPairView):
  """
    in 'view' baraye 'login user' ke shoma 'email va password' midi behet 'access va refresh token' mide.
  """
  serializer_class = JWTTokenSerializer

# ---------------------------------------------Register View ------------------------------------------ #

class RegisterJWTView(generics.CreateAPIView):
  """
    in 'view' baraye 'register user' ke shoma 'fullname va  va phone va password' midi barat 'user' misaze.
  """
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  
  # dar inja chon niazi be authentication nadarim yani lazem nist kasi login kone chon mikhaim user besazim pas bayad dastresi be hame bedim.
  permission_classes = (AllowAny, )

# ---------------------------------------------Password Reset View ------------------------------------------ #

def generate_otp():
  # inja mikhaim ye 'code unique' besazim ke ye 'code yek bar masraf' baraye 'user'
  uuid_key = shortuuid.uuid()
  return uuid_key[:6]

class PasswordResetEmailVerifyView(generics.RetrieveAPIView):
  """
    dakhel in view ma mikhaim biaim 'email user' ro begirim azash biaim bebinim 'email' ke vared karde aslan
    'verify ya motabare' va hamchin 'user' vojud dare ya na; 
    age vojud dasht biad baraye oun 'user otp' besaze va badesh biad 'uidb64 va otp user' ro bede be link ke 
    ma mikhaim 'user' bere va 'password' jadid dakhel besaze yani dakhel yek 'view' dige miaim 'password reset' 
    ro misazim.
  """
  permission_classes = (AllowAny, )
  serializer_class = UserSerializer
  
  def get_object(self):  
    """ 
      inja miaim 'email user' ro az 'url' migirim va check mikonim hamchin user vojud dare ya na; 
      age vojud dasht biad baraye oun 'user otp' besaze va badesh biad 'uidb64 va otp user' ro bede be link ke 
      ma mikhaim 'user' bere va 'password' jadid dakhel besaze yani dakhel yek 'view' dige miaim 'password reset' 
      ro misazim.
    """
    email = self.kwargs['email']
    
    if user := User.objects.get(email=email):
      user.otp = generate_otp()
      user.save()

      uidb64 = user.pk
      otp = user.otp

      link = f'http://localhost:5173/create_new_password?otp={otp}&uidb64={uidb64}'

      print("link =====", link)
    return user
