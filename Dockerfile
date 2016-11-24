FROM node:slim
MAINTAINER David Stotijn <david@messagebird.com>

ENV PORT=80

COPY . /src

WORKDIR /src/server
RUN mkdir /build \
    && npm install \
    && npm run build \
    && cp -R build/ /build/server/ \
    && cp -R node_modules /build/server \
    && cd /src/client \
    && npm install \
    && npm run build \
    && cp -R build/ /build/client/ \
    && cd / \
    && rm -rf /src

EXPOSE 80
WORKDIR /build/server
CMD ["node", "index.js"]
