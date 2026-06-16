FROM node:20.10.0-alpine 
#Imagen con la que quiero trabajar

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001

CMD ["npm", "run", "dev"]
