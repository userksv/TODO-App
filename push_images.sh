docker login
sleep 5

docker push userksv/mysite-backend:latest 

docker push userksv/mysite-celery_worker:latest 
docker push userksv/mysite-celery_beat:latest 
docker push userksv/mysite-frontend:latest 
