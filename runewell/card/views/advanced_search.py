from django.shortcuts import render

from ..models.card import Card


def advanced_search_form(request):
    types = Card.objects.values_list('type', flat=True).distinct().order_by('type')
    sets = Card.objects.values_list('set_name', flat=True).distinct().order_by('set_name')
    return render(request, "advanced_search/advanced_search.html",
                  {"types": list(types), "sets": list(sets)})
