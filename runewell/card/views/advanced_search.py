from django.shortcuts import render

from runewell.card.models.card import Card


def advanced_search_form(request):
    types = Card.objects.values_list('type').distinct().order_by('type')
    sets = Card.objects.values_list('set_name').distinct().order_by('set_name')
    dict = {'types': types, 'sets': sets}
    return render(request, "advanced_search/advanced_search.html", {"dict": dict})
