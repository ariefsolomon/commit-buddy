from rest_framework import serializers
from .models import FocusSession

class FocusSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FocusSession
        fields = ['id', 'user', 'habit', 'start_time', 'end_time', 'status', 'proof_image']
        read_only_fields = ['user']
