from django.core.paginator import Paginator
from django.shortcuts import render

from .commons.Enums import OrderBy
from .models import Card


def search(request):
    order_request = request.GET.get("order")
    if order_request not in [order_by.value for order_by in OrderBy]:
        order_request = None
    order = 'name' if order_request is None else order_request
    direction = '' if request.GET.get("dir") is None or request.GET.get("dir") == 'asc' else '-'
    card_name = request.GET.get("name")
    if card_name is not None and card_name != '' and not card_name.isspace():
        card_list = Card.objects.filter(name__icontains=card_name).order_by(f"{direction}{order}")
    else:
        card_list = Card.objects.all().order_by(f"{direction}{order}")
    paginator = Paginator(card_list, 60)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
    return render(request, "search/search.html", {"page_obj": page_obj})

def details(request, card_id=0):
    # todo tratar caso de id = 0
    card = Card.objects.filter(id=card_id).first()
    return render(request, "details/details.html",{"card":card})