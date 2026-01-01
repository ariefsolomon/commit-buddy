from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from focus_sessions.models import FocusSession

class ReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        completed_sessions = FocusSession.objects.filter(user=user, status='completed').count()
        failed_sessions = FocusSession.objects.filter(user=user, status='failed').count()
        pending_sessions = FocusSession.objects.filter(user=user, status='pending').count()

        report_data = {
            'completed_sessions': completed_sessions,
            'failed_sessions': failed_sessions,
            'pending_sessions': pending_sessions,
        }
        return Response(report_data)