FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# cffi caused error solution: https://stackoverflow.com/questions/71372066/docker-fails-to-install-cffi-with-python3-9-alpine-in-dockerfile
# RUN apk add --update --no-cache --virtual .tmp-build-deps \
#     gcc libc-dev linux-headers postgresql-dev \
#     && apk add libffi-dev && \
#     pip install --no-cache-dir -r requirements.txt && \
#     apk --purge del .build-deps

RUN apk add --update --no-cache --virtual .tmp-build-deps gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev \
    && pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && apk --purge del .tmp-build-deps 

# CMD [ "celery", "-A", "todo_project", "worker", "-l" "INFO", "-B" ]

COPY . /app/backend/
