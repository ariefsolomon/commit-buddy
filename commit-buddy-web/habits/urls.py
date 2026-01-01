from django.urls import path
from .views import HabitListCreateView, HabitRetrieveUpdateDestroyView

urlpatterns = [
    path('', HabitListCreateView.as_view(), name='habit-list-create'),
    path('<int:pk>/', HabitRetrieveUpdateDestroyView.as_view(), name='habit-retrieve-update-destroy'),
]
