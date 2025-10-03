FROM nginx:alpine

# Copy static site
COPY . /usr/share/nginx/html

# Copy custom config
COPY default.conf /etc/nginx/conf.d/default.conf

# Koyeb will use $PORT (usually 8000)
EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
