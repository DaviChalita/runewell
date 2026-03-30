from typing import Any

from django.core.paginator import Paginator
from django.db.models import F
from django.shortcuts import render

from ..commons.order_by_enum import OrderBy
from ..models.card import Card


def search_list(request):
    if request.method != 'GET':
        return render("non_success_cases/method_not_allowed.html")

    card_name = request.GET.get("name")
    card_effect = request.GET.get('effect')
    card_type = request.GET.getlist('card_type')
    card_colors = request.GET.getlist('domain')
    card_sets = request.GET.getlist('set')
    card_rarities = request.GET.getlist('rarities')
    cost = request.GET.get('cost')
    cost_op = request.GET.get('cost_op')
    might = request.GET.get('might')
    might_op = request.GET.get('might_op')

    filters = {}

    if card_name is not None and card_name != '' and not card_name.isspace():
        filters['name__icontains'] = card_name
    if card_effect is not None and card_effect != '' and not card_name.isspace():
        filters['effect__icontains'] = card_effect
    if card_type is not None and card_type:
        filters['type__in'] = card_type
    if card_colors is not None and card_colors:
        filters['color__contains'] = card_colors
    if card_sets is not None and card_sets:
        filters['set_name__in'] = card_sets
    if card_rarities is not None and card_rarities:
        filters['rarity__in'] = card_rarities

    validate_number_filter_and_add_to_filter(cost, cost_op, filters, 'cost')

    validate_number_filter_and_add_to_filter(might, might_op, filters, 'might')

    order_request = request.GET.get("order")
    if order_request not in [order_by.value for order_by in OrderBy]:
        order_request = None
    order = 'name' if order_request is None else order_request
    direction = '' if request.GET.get("dir") is None or request.GET.get("dir") == 'asc' else '-'

    query = Card.objects.filter(**filters)
    ordering = F(order).desc(nulls_last=True) if direction == '-' else F(order).asc()
    card_list = query.order_by(ordering)

    if card_list.count() == 0:
        return render(request, "list/no_results.html")

    if card_list.count() == 1:
        return render(request, "details/details.html", {"card": card_list.first()})

    paginator = Paginator(card_list, 60)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
    return render(request, "list/list.html", {"page_obj": page_obj})


def validate_number_filter_and_add_to_filter(number, number_op, filters: dict[Any, Any], field_filter: str):
    if number is not None and number != '' and not number.isspace() and number.isnumeric() \
            and number_op is not None and number_op != '' and not number_op.isspace():
        filters[f'{field_filter}__{number_op}'] = max(0, min(int(number), 2147483647))
