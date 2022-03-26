from django.urls import path 
from . import views

urlpatterns = [
    # path('spotify-view' , views.spotifyView),
    path('get-auth-url' , views.AuthURL.as_view()),
    path('redirect' , views.spotify_callback),
    path('is-authenticated' , views.IsAuthenticated.as_view()),
    path('current-song' , views.CurrentSong.as_view()),
    path('pause' , views.PauseSong.as_view()),
    path('play' , views.PlaySong.as_view()),
    path('skip-song' , views.SkipSong.as_view())
]