from django.urls import path

from .views import list, details, advanced_search

urlpatterns = [
    path("card/list", list.search_list, name="list"),
    path("card/<int:card_id>/", details.card_details),
    path("card/advanced", advanced_search.advanced_search_form,name="card_advanced"),
]
