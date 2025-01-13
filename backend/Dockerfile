FROM python:3.12.4-slim

COPY ./backend/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]