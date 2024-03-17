"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import  ProductViewSet, fetch_products_with_limit

# Create a router and register the ProductViewSet
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('users.urls')),  # Assuming 'users.urls' is the URLconf for user-related views

    # Register the product routes from the router
    path('', include(router.urls)),
    path('products/<int:pk>/', ProductViewSet.as_view({'get': 'retrieve'}), name='product-detail'),
    path('products/categories/', ProductViewSet.as_view({'get': 'categories'}), name='product-categories'), 
   
    path('products/category/<str:category>/', ProductViewSet.as_view({'get': 'category_products'}), name='category-products'),
    path('products/search/', ProductViewSet.as_view({'get': 'search'}), name='product-search'),
    path('products/limited/', fetch_products_with_limit, name='fetch-products-with-limit'),

]
