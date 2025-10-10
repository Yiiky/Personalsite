FROM nginx:alpine

# Copy static site
COPY . /usr/share/nginx/html

# Copy template config
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
