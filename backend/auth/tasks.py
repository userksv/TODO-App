# Send Welcome email
# Send notification email every day at 00:00, 'how many active tasks remains'
from time import sleep
from django.core.mail import send_mail
from celery import shared_task
import datetime

@shared_task()
def send_welcome_email_task(recipient, username):
    send_mail(
        "Welcome to TODO App",
        f'This is a welcome email from my TODO application!\n Your username is: "{username}". Use it to login to website!',
        "todo app developer",
        [recipient],
        fail_silently=False,
    )


