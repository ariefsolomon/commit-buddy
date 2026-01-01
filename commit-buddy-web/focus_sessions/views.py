from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import FocusSession
from .serializers import FocusSessionSerializer

class FocusSessionListCreateView(generics.ListCreateAPIView):
    serializer_class = FocusSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FocusSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FocusSessionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FocusSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FocusSession.objects.filter(user=self.request.user)