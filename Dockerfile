FROM nginx:alpine

# Copy static site
COPY . /usr/share/nginx/html

# Copy template config
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Expose the dynamic port
EXPOSE 8000

# Start Nginx (envsubst will replace ${PORT})
CMD ["sh", "-c", "envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
