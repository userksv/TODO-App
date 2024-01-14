FROM --platform="linux/amd64" python:3.11-alpine 

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend


COPY requirements.txt /app/backend/

RUN apk --no-cache add vim

RUN apk add --update --no-cache --virtual .tmp-build-deps gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev \
    && pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && apk --purge del .tmp-build-deps 

COPY ./start-django.sh /start-django
RUN chmod +x /start-django

COPY ./celery/worker/start-worker.sh /start-worker
RUN chmod +x /start-worker

COPY ./celery/beat/start-beat.sh /start-beat
RUN chmod +x /start-beat

COPY . /app/backend/

