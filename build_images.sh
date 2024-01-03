#!/bin/bash

# docker build -t userksv/mysite-backend:latest backend
# docker build -t userksv/mysite-celery_worker:latest backend
# docker build -t userksv/mysite-celery_beat:latest backend
# docker build -t userksv/mysite-frontend:latest frontend

docker build -t 930849404806.dkr.ecr.ap-northeast-2.amazonaws.com/todo:latest
docker build -t 930849404806.dkr.ecr.ap-northeast-2.amazonaws.com/todo-worker:latest
docker build -t 930849404806.dkr.ecr.ap-northeast-2.amazonaws.com/todo-beat:latest
docker build -t 930849404806.dkr.ecr.ap-northeast-2.amazonaws.com/todo-frontend:latest

