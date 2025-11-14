import json

from django.core.paginator import Paginator
from django.shortcuts import render

from .models import Card


# Create your views here.

def list(request):
    card_list = Card.objects.all()
    paginator = Paginator(card_list, 60)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
    return render(request, "list/index.html", {"page_obj": page_obj})
