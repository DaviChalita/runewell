import json

from django.http import HttpResponse
from django.template import loader

from .models import Lista


# Create your views here.

def list(request):
    with open('../commons/cards_list.json') as json_file:
        data = json.load(json_file)['data']
        value = [row[18] for row in data][0]
        list = Lista.image(image=value)
        template = loader.get_template("/list/index.html")
        context = {"imagem": list}
        return HttpResponse(template.render(context, request))
        # paginator = Paginator(value, request.GET.get("size"))
        # pg_number = request.GET.get("page")
        # pg = paginator.get_page(pg_number)
        # return render(request, "list.html", {"pg_obj": pg})
