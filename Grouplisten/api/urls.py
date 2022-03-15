from django.urls import path ,include
from api import views
from .views import RoomView

app_name="api"

urlpatterns = [
    path('room', RoomView.as_view()),
]