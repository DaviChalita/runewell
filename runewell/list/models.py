from django.db import models

# Create your models here.

class Card:
    image: str

    def __init__(self,image):
        self.image = image