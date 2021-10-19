FROM node:14
WORKDIR /usr
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
RUN ls -a
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:14
WORKDIR /usr
COPY package*.json ./
COPY prisma ./prisma
RUN npm cache clean --force
RUN npm install --only=production
RUN npm install @prisma/client
RUN npx prisma generate
#RUN prisma generate
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 4000
CMD ["pm2-runtime","server.js"]