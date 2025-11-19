from django.urls import path

from . import views

urlpatterns = [
    path("card/search", views.search, name="search"),
    path("card/<int:card_id>/", views.details),
]
