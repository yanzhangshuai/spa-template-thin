
# 阶段1: 基础配置
FROM node:22-slim AS build

ARG REGISTRY_URL=https://registry.npmjs.org/

WORKDIR /app

COPY package*.json .npmrc* pnpm-lock.yaml ./

# 自动检包管理器类型 配置仓库
RUN echo "registry=${REGISTRY_URL}" > .npmrc && \
    [ -n "${NPM_AUTH}" ] && echo "//${REGISTRY_URL#*://}:_authToken=${NPM_AUTH}" >> .npmrc || true


RUN [ -f "pnpm-lock.yaml" ] || { echo "Error: pnpm-lock.yaml not found"; exit 1; } && \
    npm install -g pnpm --registry=${REGISTRY_URL} && \
    pnpm install --frozen-lockfile --registry=${REGISTRY_URL}

COPY . .
RUN pnpm run build


# 阶段2: 生产阶段
FROM nginx:alpine-slim

EXPOSE 80

COPY --from=build /app/dist /usr/share/nginx/html

RUN mkdir -p /etc/nginx/templates /etc/nginx/conf.d

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./deploy/templates /etc/nginx/templates/
COPY ./deploy/entrypoint.sh /


RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
