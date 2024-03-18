from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework import  viewsets

class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer