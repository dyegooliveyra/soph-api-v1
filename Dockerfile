# Use Node 20 como base
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (melhor para cache)
COPY package.json yarn.lock ./

# Instala dependências completas (não só produção)
RUN yarn install

# Copia o restante do projeto (por exemplo, dist)
COPY dist ./dist

# Adiciona a variável de ambiente do dotenv, se necessário
ENV NODE_ENV=production

# Roda com suporte a source maps e dotenv
CMD ["node", "--enable-source-maps", "-r", "dotenv/config", "dist/main.js"]
