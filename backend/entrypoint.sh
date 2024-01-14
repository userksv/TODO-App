# #!/bin/sh

# python manage.py makemigrations
# python manage.py migrate --no-input
# python manage.py collectstatic --no-input

# gunicorn todo_project.wsgi:application --bind 0.0.0.0:8000
# python -m celery -A todo_project worker -l info
# python -m celery -A todo_project beat -l INFO
# # python manage.py runserver