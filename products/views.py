from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.views import APIView


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):
        limit = request.query_params.get('limit', None)
        if limit:
            queryset = self.queryset[:int(limit)]
        else:
            queryset = self.queryset.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def categories(self, request, *args, **kwargs):
        categories = Product.objects.values_list('category', flat=True).distinct()
        return Response(categories)
    

    def category_products(self, request, category, *args, **kwargs):
        queryset = self.queryset.filter(category=category)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def search(self, request, *args, **kwargs):
        search_term = request.query_params.get('q', None)
        if search_term:
            queryset = self.queryset.filter(title__icontains=search_term)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def fetch_products_with_limit(request):
    limit = request.query_params.get('limit', None)
    if limit:
        products = Product.objects.all()[:int(limit)]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "Limit parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    
