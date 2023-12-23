from django.db import models

class Task(models.Model):
    title =         models.CharField(max_length=50)
    description =   models.CharField(max_length=100)
    created =       models.DateTimeField(auto_now_add=True)
    owner =         models.ForeignKey('auth.User', related_name='tasks', on_delete=models.CASCADE)
    completed =     models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    class Meta:
        ordering = ['created']
    
# class CompletedTasks(models.Model):
#     task = models.ForeignKey(Task, on_delete=models.CASCADE)