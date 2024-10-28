from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

from .models import User, Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = "__all__"

    """
        dar in 'method' miad baraye ma khoruji nahayi ro namayesh mide. aval default 'super().to_representation(instance)،' khodesh ro
        mizarim.
        badesh miaim migim 'data serializer model user' ro bia 'data' ro dakhel 'field user serializer model profile' gharar bede.
        dar akhar ham 'serializer model profile' ro namayesh bede.
        
        in 'method' dar asl miad 'user' ro be surat 'nested' namayesh mide. ke in kar ba neveshtan 'field user' dar 
        'serializer model profile' tavasot khod Django anjam mishe va niazi be neveshtan ma nist.
        
        faghat mikhastam neshun bedam Django chejuri in kar ro anjam mide.
    """
    # def to_representation(self, instance):
    #   response = super().to_representation(instance)
    #   response['user'] = UserSerializer(instance.user).data
    #   return response


# The `JWTTokenSerializer` class extends `TokenObtainPairSerializer` to customize the token generation
# process by adding user-specific information like username, email, fullname, phone, and vendor ID if
# available.
class JWTTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user=User):
        # The line `token = super().get_token(user)` is calling the `get_token` method of the parent class
        # (TokenObtainPairSerializer) using the `super()` function. This allows the child class
        # (JWTTokenSerializer) to inherit and extend the functionality of the parent class.
        token = super().get_token(user)

        # The code snippet you provided is from the `JWTTokenSerializer` class, which extends
        # `TokenObtainPairSerializer` to customize the token generation process by adding user-specific
        # information to the token payload.

        # افزودن اطلاعات سفارشی به توکن
        token["username"] = user.username  # افزودن نام کاربری به payload توکن.
        token["email"] = user.email  # افزودن ایمیل کاربر به توکن.
        token["fullname"] = user.fullname  # افزودن نام کامل کاربر به توکن.
        token["phone"] = user.phone  # افزودن شماره تماس کاربر به توکن.
        
        token['vender_id'] = getattr(user, 'vender_id', 0)  # مقدار پیش‌فرض 0 اگر vender_id وجود نداشته باشد

        """
            agar ma in 'data' ro befrestim be 'server' ta 'token' daryaft konim zaman 'login user' az taraf 'server'
            be ma data va token dade khahad shod:
            {
                "refresh": "your_refresh_token",
                "access": "your_access_token",
                "username": "testuser",
                "email": "testuser@example.com",
                "fullname": "Test User",
                "phone": "1234567890",
                "vender_id": 0
            }
        """

        return token


# dar inja mikhaim baraye 'sign up user' oumadim 'RegisterSerializer' sakhtim.
class RegisterSerializer(serializers.ModelSerializer):
    """
        dar inja miaim 'field' ke mikhaim ro aval misazim:
        
        password: field baraye 'password user' ke dar inja 'write_only' yani faghat zamani ke 'data' be server mire 
        ferestade beshe va dige zamani ke server mikhad 'data user' ro be ma neshun bede 'password' dade nashe ke in kar
        baraye amniat bishtare. 
        chizi ke be server ferestade mishe: {
            "fullname": "Ali Ahmad",
            "email": "ali@example.com",
            "phone": "09123456789",
            "password": "my_secure_password",
            "password2": "my_secure_password"
        }
        chizi ke az server 'data user' ersal mishe: {
            "id": 1,
            "fullname": "Ali Ahmad",
            "email": "ali@example.com",
            "phone": "09123456789"
        }
        
        dar akhar 'validate_password' yani 'password user' ba 'standard' moshakhas 
        
        password2: field baraye 'password validation' ke 'user' bayad dobare benevise.
    """
    
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["fullname", "email", "phone", "password", "password2"]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password does not match password2"}
            )
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            fullname=validated_data["fullname"],
            email=validated_data["email"],
            phone=validated_data["phone"],
        )

        email_username, _ = user.email.split("@")
    
        user.username = email_username
        
        # az 'set_password' estefade kardim ta 'password user' ramz gozari shode zakhire beshe.
        user.set_password(validated_data["password"])
        user.save()
        
        return user
