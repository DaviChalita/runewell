from django.http import HttpResponse


def riot_txt(request):
    return HttpResponse(
        "5a914537-38ec-4bbd-8f64-5314fc1a6fdb",
        content_type="text/plain"
    )
