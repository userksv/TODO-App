from django.core.mail import send_mail
from celery import shared_task
from django.contrib.auth.models import User


@shared_task()
def test_task():
    print("Testing tasks and beat!!!!!!!")
    return

@shared_task()
def send_email_remainder():
    users = get_users_tasks()
    if users:
        for email_addr, tasks in users.items():
            send_mail(
                'Remainder from Your Tasks!',
                f'Hey!\nYou have:\n \t{tasks[0]} active tasks\n\t{tasks[1]} uncompleted tasks!\nJust reminder',
                'From TODO app developer',
                [email_addr]
            )

def get_users_tasks():
   """
   Function return dict {email:[active_tasks, completed_tasks]}
   or None if there is an empty query
   """
   try:
        users = User.objects.all().prefetch_related('tasks')
        if not users:
            return None
        return {i.email: [
            i.tasks.filter(completed=False).count(),
            i.tasks.filter(completed=True).count(),
            ] 
            for i in users}
   except:
        print("Some error")
        return None
   