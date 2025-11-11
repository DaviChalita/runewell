from django.db import models
from django.views.generic import ListView


# Create your models here.

class Card:
    image: str

    def __init__(self,image):
        self.image = image

class CardListView(ListView):
    paginated_by = 2
    model = Card