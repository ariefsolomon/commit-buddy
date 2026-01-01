from rest_framework import generics, permissions
from .models import Partnership
from .serializers import PartnershipSerializer
from django.db.models import Q

class PartnershipListCreateView(generics.ListCreateAPIView):
    serializer_class = PartnershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Partnership.objects.filter(Q(inviter=user) | Q(invitee=user))

    def perform_create(self, serializer):
        serializer.save(inviter=self.request.user)

class PartnershipRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PartnershipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Partnership.objects.filter(Q(inviter=user) | Q(invitee=user))

    def perform_update(self, serializer):
        instance = serializer.instance
        if self.request.user == instance.invitee and 'status' in serializer.validated_data:
            # Allow invitee to accept/reject
            serializer.save()
        elif self.request.user == instance.inviter:
            # Allow inviter to do other updates (e.g., withdraw invitation)
            serializer.save()
        else:
            # Prevent other updates
            raise permissions.PermissionDenied("You do not have permission to perform this action.")

    def perform_destroy(self, instance):
        if self.request.user == instance.inviter or self.request.user == instance.invitee:
            instance.delete()
        else:
            raise permissions.PermissionDenied("You do not have permission to perform this action.")