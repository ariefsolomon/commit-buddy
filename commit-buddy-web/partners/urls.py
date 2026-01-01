from django.urls import path
from .views import PartnershipListCreateView, PartnershipRetrieveUpdateDestroyView

urlpatterns = [
    path('', PartnershipListCreateView.as_view(), name='partnership-list-create'),
    path('<int:pk>/', PartnershipRetrieveUpdateDestroyView.as_view(), name='partnership-retrieve-update-destroy'),
]
