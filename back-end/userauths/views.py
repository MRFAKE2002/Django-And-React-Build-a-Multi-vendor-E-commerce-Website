# Django
from django.shortcuts import render

# libraries
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
import shortuuid

# My apps
from .models import User, Profile
from .serializer import JWTTokenSerializer, RegisterSerializer, UserSerializer


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

# ---------------------------------------------Password Reset Email Verification View ------------------------------------------ #

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
      # inja ke user mikhad 'password' avaz kone miaim ye 'otp' yani 'password yek bar masraf' barash misazim.
      user.otp = generate_otp()
      user.save()

      uidb64 = user.pk
      otp = user.otp

      # inja ham dakhel in 'link' miaim 'otp va uidb64 user' ro midim ke betunim befahmim kodum 'user' 
      # mikhad 'password' avaz kone.
      link = f'http://localhost:5173/create-new-password?otp={otp}&uidb64={uidb64}'

      print("link =====", link)
    return user

# ---------------------------------------------Create New Password View ------------------------------------------ #

class ChangePasswordView(generics.CreateAPIView):
  permission_classes = (AllowAny, )
  serializer_class = UserSerializer
  
  def create(self, request, *args, **kwargs):
    """
      kari ke ma inja mikonim oun 'data' ke az taraf 'front-end CreateNewPassword.jsx page' miad ro begirim va agar
      hamchin 'user' vojud dasht betune 'password' khodesh ro avaz kone.
    """
    
    # inja amalan migim az dakhel 'request' oun 'object data' ro bede
    payload = request.data
    
    # alan migim dar 'object data' bia 'value' in 'name' ke behet mikham ro bede.
    user_otp = payload["otp"]
    user_uidb64 = payload["uidb64"]
    # reset_token = payload["reset_token"]
    user_password = payload["password"]
    
    """ 
      inja migim agar in 'user' vojud dasht bia oun 'password' ke az 'front-end' gereftim ro 'set_password' ro 
      seda bezan va 'password' jadid ro behesh midim.
    """
    if user:= User.objects.get(id=user_uidb64, otp=user_otp):
      user.set_password(user_password)
      user.otp = ""
      # user.reset_token = ""
      user.save()
      
      return Response({"message" : "Password changed successfully"}, status=status.HTTP_201_CREATED)
    else:
      return Response({"message" : "An error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
