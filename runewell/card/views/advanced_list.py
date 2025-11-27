from ..models.card_request import CardRequest


def advanced_search_list(request):
    card_req = CardRequest(data=request.data)