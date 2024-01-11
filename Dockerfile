FROM node:20-alpine
WORKDIR /usr/todo_backend
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "start"]

