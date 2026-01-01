from django.db import models
from django.conf import settings
from habits.models import Habit

class FocusSession(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('started', 'Started'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    proof_image = models.ImageField(upload_to='proof_images/', null=True, blank=True)

    def __str__(self):
        return f'{self.user.username} - {self.habit.name} ({self.status})'