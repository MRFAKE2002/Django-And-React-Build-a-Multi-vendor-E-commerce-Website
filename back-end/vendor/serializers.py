from rest_framework import serializers



class SummarySerializers(serializers.Serializer):
  products = serializers.IntegerField()
  orders = serializers.IntegerField()
  revenue = serializers.DecimalField(max_digits=12, decimal_places=2)

