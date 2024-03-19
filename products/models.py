from django.db import models

# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discountPercentage = models.DecimalField(max_digits=5, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    stock = models.IntegerField()
    brand = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    thumbnail = models.ImageField(upload_to='products/thumbnails/')
    images = models.ImageField(upload_to='products/images/')

    def __str__(self):
        return self.title


