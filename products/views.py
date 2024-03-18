from rest_framework.generics import ListAPIView, RetrieveAPIView ,ListCreateAPIView
from .models import Product
from .serializers import ProductSerializer

class ProductList(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer