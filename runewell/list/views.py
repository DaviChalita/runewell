import json

from django.core.paginator import Paginator
from django.shortcuts import render

from .models import Card


# Create your views here.

def list(request):
    with open('../commons/cards_list.json') as json_file:
        data = json.load(json_file)['data']
        values = [row[18] for row in data]
        card_list = []
        for value in values:
            card_list.append(Card(image=value))
        paginator = Paginator(card_list, request.GET.get("size"))
        page_number = request.GET.get("page")
        page_obj = paginator.get_page(page_number)
        return render(request, "list/index.html", {"page_obj": page_obj})
