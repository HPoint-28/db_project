FROM node:18-alpine

WORKDIR /app

# Сначала копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем их
RUN npm install

# Копируем весь проект
COPY . .

# Запускаем в режиме разработки
CMD ["npm", "run", "dev"]