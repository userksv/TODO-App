FROM --platform="linux/amd64" python:3.11-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend


COPY requirements.txt /app/backend/
COPY ./entrypoint.sh /app/backend/

RUN chmod a+x /app/backend/entrypoint.sh

RUN apk --no-cache add vim

RUN apk add --update --no-cache --virtual .tmp-build-deps gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev \
    && pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && apk --purge del .tmp-build-deps 

COPY . /app/backend/


ENTRYPOINT [ "sh", "/app/backend/entrypoint.sh" ]

