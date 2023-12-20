from django.db import models

# Create your models here.
class Task(models.Model):
    text = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.text[:5]

    class Meta:
        ordering = ['created']