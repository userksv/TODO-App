#!/bin/sh

rm -f './celerybeat.pid'
python -m celery -A todo_project beat -l INFO
