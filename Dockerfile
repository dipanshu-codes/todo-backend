FROM node:20-alpine
WORKDIR /usr/todo_backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 2121
CMD ["npm", "run", "start"]
