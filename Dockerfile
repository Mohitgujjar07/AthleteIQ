FROM nginx:alpine
LABEL maintainer="AthleteIQ"
LABEL version="1.0.0"
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
