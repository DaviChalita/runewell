from django.urls import path

from .views import search, details

urlpatterns = [
    path("card/search", search.search_list, name="search"),
    path("card/<int:card_id>/", details.card_details),
]
