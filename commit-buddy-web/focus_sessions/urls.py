from django.urls import path
from .views import FocusSessionListCreateView, FocusSessionRetrieveUpdateDestroyView

urlpatterns = [
    path('', FocusSessionListCreateView.as_view(), name='focussession-list-create'),
    path('<int:pk>/', FocusSessionRetrieveUpdateDestroyView.as_view(), name='focussession-retrieve-update-destroy'),
]
