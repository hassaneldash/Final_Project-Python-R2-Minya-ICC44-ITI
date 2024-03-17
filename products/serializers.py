from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'discount_percentage', 'rating', 'stock', 'brand', 'category', 'thumbnail', 'images']
