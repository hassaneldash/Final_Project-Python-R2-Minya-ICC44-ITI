from django.db import models
import uuid
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.shortcuts import get_object_or_404
from django.utils import timezone
from decimal import Decimal
# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50)
    is_active = models.BooleanField(default=False)
    CUSTOMER = 'customer'
    SELLER = 'seller'
    Role_CHOICES = [
      (CUSTOMER, "customer"),
      (SELLER, "seller"),
    ]


##############################################################################
class Activation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    # checking if the token is expired or not

    def is_expired(self):
        return self.expires_at <= timezone.now()

    def __str__(self):
        return f"Activation for {self.user.name}"


##############################################################################
