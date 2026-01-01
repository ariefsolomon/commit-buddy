from django.db import models
from django.conf import settings

class Partnership(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    inviter = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sent_invitations', on_delete=models.CASCADE)
    invitee = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='received_invitations', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('inviter', 'invitee')

    def __str__(self):
        return f'{self.inviter.username} -> {self.invitee.username} ({self.status})'