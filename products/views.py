from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import Product
from .serializers import ProductSerializer

class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer