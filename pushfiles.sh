#!/bin/sh

# ENV FILE
scp -i /Users/kim/desktop/aws/key.pem \
      ./backend/todo_project/.env\
      ubuntu@ec2-15-165-190-20.ap-northeast-2.compute.amazonaws.com:/home/ubuntu/mysite/backend/todo_project/