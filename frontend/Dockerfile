# Этап сборки (Build stage)
FROM node:alpine as build

# Копируем package.json и устанавливаем зависимости
COPY package.json package.json
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Выполняем сборку проекта
RUN npm run build

# Этап финального образа (Production stage)
FROM nginx:stable-alpine

# Копируем собранные файлы и конфиг nginx из этапа build
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт для nginx
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
