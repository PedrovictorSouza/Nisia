FROM python:3.7.4-alpine3.10

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN apk add --no-cache postgresql-libs && \
  apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
  pip install --no-cache-dir -r requirements.txt && \
  apk --purge del .build-deps

COPY . .

RUN python manage.py collectstatic

RUN apk add --no-cache bash && \
    apk add nginx && \
    apk add supervisor && \
    cp -r shared/staticfiles/* /var/lib/nginx/html

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN echo "command=gunicorn --workers 1 --bind :8080 nisia.wsgi:application" >> /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
