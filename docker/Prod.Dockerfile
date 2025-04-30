FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:22-alpine

RUN npm install -g serve
COPY --from=builder /app/build /srv
EXPOSE 3000
CMD ["serve", "-s", "/srv", "-l", "3000"]
