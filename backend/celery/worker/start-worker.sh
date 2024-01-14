#!/bin/sh

python -m celery -A todo_project worker -l info
