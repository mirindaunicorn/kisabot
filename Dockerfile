# Використовуємо офіційний образ Node.js
FROM node:14

# Вказуємо робочу директорію в контейнері
WORKDIR /usr/src/app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Виконуємо npm install для встановлення залежностей
RUN npm install

# Копіюємо усі файли з поточного каталогу в контейнер
COPY . .

# Запускаємо ваш Telegram-бот
CMD ["node", "app.js"]
