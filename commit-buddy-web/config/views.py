from rest_framework.response import Response
from rest_framework.views import APIView

class HomeView(APIView):
    def get(self, request):
        return Response({
            'message': 'Welcome to the Commit Buddy API!',
            'endpoints': {
                'accounts': '/api/accounts/',
                'habits': '/api/habits/',
                'focus_sessions': '/api/focus-sessions/',
                'partners': '/api/partners/',
                'reports': '/api/reports/',
                'admin': '/admin/',
            }
        })
