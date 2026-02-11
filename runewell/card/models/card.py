from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.views.generic import ListView

class Card(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    effect = models.TextField()
    color = ArrayField(models.TextField(null=True,blank=True), blank=True,)
    cost = models.TextField()
    type = models.TextField()
    might = models.TextField()
    tags = ArrayField(models.TextField(null=True,blank=True), blank=True,)
    set_name = models.TextField()
    rarity = models.TextField()
    image = models.TextField()

    class Meta:
        db_table = 'cards'


class CardListView(ListView):
    paginated_by = 2
    model = Card
