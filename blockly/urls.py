from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="blockly"),
    path('parse_code', views.parse_code, name="parse_code"),
    path('update_code', views.update_code, name="update_code"),
    path('download_code', views.download_code, name="download_code")
]
