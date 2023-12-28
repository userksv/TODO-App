# Send notification email every day at 00:00, 'how many active tasks remains'
from django.core.mail import send_mail
from celery import shared_task
from django.contrib.auth.models import User

@shared_task()
def send_email_remainder():
    # TODO:
    # Get all users email addresse with not completed tasks
    emails = get_emails_for_completed_false()
    if emails:
        for addr, tasks in emails.items():
            send_mail(
                'Remainder from Your Tasks!',
                f'Hey! You have {tasks} uncompleted tasks!\n Just reminder',
                'From TODO app developer',
                [addr]
            )
    print('Sending email........')


def get_emails_for_completed_false():
   """
   Function return list of dict {email:tasks count}
   or None if there is empty query
   """
   try:
        # distinct()-eliminates duplicate rows
        users_and_incomplete_tasks = User.objects.filter(tasks__completed=False).distinct().prefetch_related('tasks')
        if not users_and_incomplete_tasks:
            return None
        # return [{'email': i.email, 'count': i.tasks.filter(completed=False).count()} for i in users_and_incomplete_tasks]
        return {i.email: i.tasks.filter(completed=False).count() for i in users_and_incomplete_tasks}
   except:
        print("Some error")
        return None