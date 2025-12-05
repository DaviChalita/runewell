from django.urls import path

from .views import list, details, advanced_search_form

urlpatterns = [
    path("card/list", list.search_list, name="list"),
    path("card/<int:card_id>/", details.card_details),
]
