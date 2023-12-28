from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab


# Set the default Django settings module for the `celery` program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_project.settings')

app = Celery('todo_project')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_scheduler = 'django_celery_beat.schedulers:DatabaseScheduler'

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f'Request: {self.request!r}')


app.conf.beat_schedule = {
    'send-email-remainder-daily-at-midnight': {
        'task': 'core.tasks.send_email_remainder',
        'schedule': crontab(minute=0, hour=0), # Execute daily at midnight.
        # 'schedule': 5.0, # for test every 5 seconds    
    },
}

