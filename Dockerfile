FROM nginx:alpine

# Copy static site
COPY . /usr/share/nginx/html

# Copy template config
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Expose the Koyeb port
EXPOSE 8000

# Start Nginx (envsubst will replace ${PORT} with 8000)
CMD ["sh", "-c", "envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
