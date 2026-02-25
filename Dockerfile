# Build stage
FROM node:25-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências (incluindo devDependencies para build)
RUN npm ci

# Copia código fonte
COPY . .

# Compila TypeScript
RUN npx tsc

# Copia assets estáticos (views e public não são compilados pelo tsc)
RUN cp -r src/views build/ && cp -r src/public build/

# Production stage
FROM node:25-alpine

WORKDIR /app

# Copia apenas dependências de produção
COPY package*.json ./
RUN npm ci --omit=dev

# Copia build e assets do stage anterior
COPY --from=builder /app/build ./build

# Usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "build/index.js"]
