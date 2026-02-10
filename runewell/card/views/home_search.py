from django.shortcuts import render


def main_search(request):
    return render(request,"home_search/home_search.html")
