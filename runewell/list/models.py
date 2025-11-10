from django.db import models

# Create your models here.

class Lista(models.Model):
    image = models.ImageField(upload_to='img')