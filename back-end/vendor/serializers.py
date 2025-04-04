from rest_framework import serializers



class SummarySerializers(serializers.Serializer):
  product = serializers.IntegerField()
  order = serializers.IntegerField()
  revenue = serializers.DecimalField(max_digits=12, decimal_places=2)

