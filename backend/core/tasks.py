from django.core.mail import send_mail
from celery import shared_task
from django.contrib.auth.models import User

@shared_task()
def send_email_remainder():
    # TODO:
    # Get all users email addresses with tasks
    emails = get_emails_for_completed_false()
    if emails:
        for addr, tasks in emails.items():
            send_mail(
                'Remainder from Your Tasks!',
                f'Hey!\nYou have:\n \t{tasks[0]} active tasks\n\t{tasks[1]} uncompleted tasks!\nJust reminder',
                'From TODO app developer',
                [addr]
            )
    print('Sending email........')


def get_emails_for_completed_false():
   """
   Function return dict {email:[active_tasks, completed_tasks]}
   or None if there is an empty query
   """
   try:
        # distinct()-eliminates duplicate rows
        users_and_incomplete_tasks = User.objects.filter(tasks__completed=False).distinct().prefetch_related('tasks')
        if not users_and_incomplete_tasks:
            return None
        return {i.email: [
            i.tasks.filter(completed=False).count(),
            i.tasks.filter(completed=True).count(),
            ] 
            for i in users_and_incomplete_tasks}
   except:
        print("Some error")
        return None