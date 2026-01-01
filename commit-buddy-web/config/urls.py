from django.contrib import admin
from django.urls import path, include
from .views import HomeView

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/habits/', include('habits.urls')),
    path('api/focus-sessions/', include('focus_sessions.urls')),
    path('api/partners/', include('partners.urls')),
    path('api/reports/', include('reports.urls')),
]