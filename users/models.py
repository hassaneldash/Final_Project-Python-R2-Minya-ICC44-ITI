from django.db import models
import uuid
# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50)
    session_token = models.UUIDField(default=uuid.uuid4, editable=False)
