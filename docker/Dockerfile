# syntax = docker/dockerfile:1

ARG NODE_VERSION="25"
ARG BASE_VERSION="alpine3.23"

ARG REACT_APP_DEBUG=false
ARG REACT_APP_API_URL=http://localhost:5050/api

FROM node:${NODE_VERSION}-${BASE_VERSION} AS builder

# Add build arguments for env variables
ARG REACT_APP_DEBUG
ARG REACT_APP_API_URL

# Set them as environment variables
ENV REACT_APP_DEBUG=${REACT_APP_DEBUG}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

WORKDIR /app

COPY package*.json tsconfig*.json vite.config.ts ./

RUN --mount=type=cache,target=/root/.npm \
  apk add git \
  && npm install

COPY . ./

RUN --mount=type=cache,target=/root/.npm \
  npm run build \
  && touch /headers \
  && chmod +r /headers \
  && chmod -wx /headers

FROM nginxinc/nginx-unprivileged:1-alpine

COPY --chown=nginx:nginx docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --from=builder /headers /usr/share/nginx/html/headers
COPY docker/docker-entrypoint.sh /

USER root:root

RUN mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.tmpl \
    && cd /usr/share/nginx/html/ \
    && ln -s /tmp/index.html

USER nginx:nginx

EXPOSE 8080
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
