from django.urls import path
from blockly import views as blockly_views

urlpatterns = [
    path('', blockly_views.index, name="blockly"),
    path('parse_code', blockly_views.parse_code, name="parse_code"),
    path('download_code', blockly_views.download_code, name="download_code")
]
