from django.shortcuts import render

from ..models.card import Card


def card_details(request, card_id=0):
    card = Card.objects.filter(id=card_id).first()
    if card is None:
        return render(request,"non_success_cases/non_existent_pg.html")
    return render(request, "details/details.html",{"card":card})