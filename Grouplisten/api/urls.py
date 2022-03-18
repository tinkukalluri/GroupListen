from django.urls import path ,include
from api import views
from . import views

app_name="api"

urlpatterns = [
    path('room', views.RoomView.as_view()),
    path('create-room' ,views.CreateRoomView.as_view() ),
    path('get-room',views.GetRoom.as_view()),
    path('join-room',views.JoinRoom.as_view()),
]