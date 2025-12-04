from django.core.paginator import Paginator
from django.shortcuts import render

from ..commons.order_by_enum import OrderBy
from ..models.card import Card


def search_list(request):
    order_request = request.GET.get("order")
    if order_request not in [order_by.value for order_by in OrderBy]:
        order_request = None
    order = 'name' if order_request is None else order_request
    direction = '' if request.GET.get("dir") is None or request.GET.get("dir") == 'asc' else '-'
    data = request.POST.get('data')

    card_name = data['name']
    card_effect = data['effect']
    card_type = data['type']
    card_colors = data['colors']
    card_sets = data['sets']
    card_rarities = data['rarities']

    filters = {}

    if card_name is not None and card_name != '' and not card_name.isspace():
        filters['name__icontains'] = card_name
    if card_effect is not None and card_effect != '' and not card_name.isspace():
        filters['effect__icontains'] = card_effect
    if card_type is not None and card_type != '' and not card_type.isspace():
        filters['type__in'] = card_type
    if card_colors is not None and card_colors != '' and not card_colors.isspace():
        filters['color__in'] = card_colors
    if card_sets is not None and card_sets != '' and not card_sets.isspace():
        filters['set_name__in'] = card_sets
    if card_rarities is not None and card_rarities != '' and not card_rarities.isspace():
        filters['rarity__in'] = card_rarities

    card_list = Card.objects.filter(**filters).order_by(f"{direction}{order}")

    if card_list.count() == 1:
        return render(request, "details/details.html", {"card": card_list.first()})

    paginator = Paginator(card_list, 60)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
    return render(request, "list/list.html", {"page_obj": page_obj})

