FROM node:20-alpine
WORKDIR /usr/src/backend
COPY . .
RUN npm i --silent -g json-server
EXPOSE 3001
CMD ["npm", "run", "mock"]