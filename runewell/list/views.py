import json

from django.core.paginator import Paginator
from django.shortcuts import render


# Create your views here.

def list(request):
    with open('../commons/cards_list.json') as json_file:
        data = json.load(json_file)['data']
        value = [row[18] for row in data]
        paginator = Paginator(value, request.GET.get("size"))
        pg_number = request.GET.get("page")
        pg = paginator.get_page(pg_number)
        return render(request, "list.html", {"pg_obj": pg})
