FROM node:20-alpine 

WORKDIR /app


ENV NODE_ENV=production

COPY package*.json ./

RUN npm install express-rate-limit


COPY prisma ./prisma/

RUN npx prisma@6.16.3 generate

COPY . .


EXPOSE 3001

CMD ["npm", "start"]