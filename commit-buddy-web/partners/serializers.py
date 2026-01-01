from rest_framework import serializers
from .models import Partnership

class PartnershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partnership
        fields = ['id', 'inviter', 'invitee', 'status', 'created_at']
        read_only_fields = ['inviter']
