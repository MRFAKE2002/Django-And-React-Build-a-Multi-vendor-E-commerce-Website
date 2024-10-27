from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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
    def get_token(cls, user):
        # The line `token = super().get_token(user)` is calling the `get_token` method of the parent class
        # (TokenObtainPairSerializer) using the `super()` function. This allows the child class
        # (JWTTokenSerializer) to inherit and extend the functionality of the parent class.
        token = super().get_token(user)

        token["username"] = user.username
        token["email"] = user.email
        token["fullname"] = user.fullname
        token["phone"] = user.phone

        try:
            token["vender_id"] = user.vender.id
        except AttributeError:
            token["vender_id"] = 0

        return token
