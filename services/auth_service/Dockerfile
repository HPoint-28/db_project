# Используем легкую версию Python
FROM python:3.11-slim

# Папка внутри контейнера, где будет лежать код
WORKDIR /app

# Копируем список библиотек и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем всё остальное (код)
COPY . .

# Запускаем сервер. 0.0.0.0 важно для Докера!
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]