from django.contrib.auth.models import User
from django.core.mail import send_mail
from auth.tasks import send_welcome_email_task

# send_welcome_email_task('serkimdev@gmail.com', 'testusername')


def test_mail():
    send_mail(
        'Subject test','Test message','from test script',['kimsergkorea@gmail.com']
    )


# def send_email_remainder():
#     # TODO:
#     # Get all users email addresse with not completed tasks
#     users = get_users_tasks()
#     print(users)
#     if users:
#         for email, tasks in users.items():
#             print(f'Hey!\nYou have:\n \t{tasks[0]} active tasks\n\t{tasks[1]} uncompleted tasks!\nJust reminder')
#             # send_mail(
#             #     'Remainder from Your Tasks!',
#             #     f'Hey!\n You have:\n \t {tasks[0]} active tasks\n\t{tasks[1]} uncompleted tasks!\n Just reminder',
#             #     'From TODO app developer',
#             #     [addr]
#             # )
#     print('Sending email........')


# def get_users_tasks():
#    """
#    Function return dict {email:[active_tasks, completed_tasks]}
#    or None if there is an empty query
#    """
#    try:
#         users = User.objects.all().prefetch_related('tasks')
#         if not users:
#             return None
#         return {i.email: [
#             i.tasks.filter(completed=False).count(),
#             i.tasks.filter(completed=True).count(),
#             ] 
#             for i in users}
#    except:
#         print("Some error")
#         return None
   
