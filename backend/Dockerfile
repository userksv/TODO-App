FROM python:3.11-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# 120.9 ERROR: No such package: .build-deps solution: ?
# RUN apk add --virtual mypacks gcc vim \
#  && apk del mypacks

# cffi caused error solution: https://stackoverflow.com/questions/71372066/docker-fails-to-install-cffi-with-python3-9-alpine-in-dockerfile
# RUN apk add --update --no-cache --virtual .tmp-build-deps \
#     gcc libc-dev linux-headers postgresql-dev \
#     && apk add libffi-dev && \
#     pip install --no-cache-dir -r requirements.txt && \
#     apk --purge del .build-deps

RUN echo "Before installing build dependencies"
RUN apk add --update --no-cache --virtual .tmp-build-deps gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev \
    && echo "Before installing Python packages" \
    && pip install --no-cache-dir -r requirements.txt \
    && echo "After installing Python packages" \
    && apk --purge del .tmp-build-deps \
    && echo "After removing build dependencies"

COPY . /app/backend/
