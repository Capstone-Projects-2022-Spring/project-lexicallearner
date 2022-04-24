FROM node:14.9-alpine
COPY ./db /app
# COPY ./db/package.json .
WORKDIR /app
RUN npm install
#&& touch db-login.json && cat db-login.json.docker > db-login.json
EXPOSE 8081
WORKDIR /app/database/api/
CMD node on-request.js
