from django.urls import path

from .views import list, details, advanced_search, home_search

urlpatterns = [
    path("list", list.search_list, name="list"),
    path("card/<int:card_id>/", details.card_details, name="card_detail"),
    path("advanced", advanced_search.advanced_search_form, name="card_advanced"),
    path("", home_search.main_search, name="main_search"),
]
