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
  
