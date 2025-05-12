# Etapa de compilación
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx tsc

# Etapa de producción
FROM node:18
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/app.js"]
