# build
FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --production

COPY . .
RUN npm run build

# serve
FROM node:22-alpine

RUN npm install -g serve
COPY --from=build-stage /app/build /srv
EXPOSE 3000

CMD ["serve", "-s", "/srv", "-l", "3000"]
