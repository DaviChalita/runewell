from django.db.models import Q
from django.shortcuts import render

from ..commons.rarity_enum import Rarity
from ..models.card import Card


def advanced_search_form(request):
    types = Card.objects.values_list('type', flat=True).distinct().order_by('type')
    supertypes = Card.objects.filter(~Q(supertype=None)).values_list('supertype', flat=True).distinct().order_by(
        'supertype')
    sets = Card.objects.values_list('set_name', flat=True).distinct().order_by('set_name')
    rarities = Card.objects.values_list('rarity', flat=True).distinct().order_by('rarity')
    rarity_list = []
    for rarity in rarities:
        rarity_list.append(Rarity(int(rarity)).name)
    return render(request, "advanced_search/advanced_search.html",
                  {"types": list(types), "supertypes": list(supertypes), "sets": list(sets), "rarities": rarity_list})
