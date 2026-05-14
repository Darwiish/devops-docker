FROM python:3.9-slim

WORKDIR /app

# Copy only requirements first to leverage layer caching
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Then copy the rest of the application code
COPY . .

EXPOSE 5002

CMD ["python", "app.py"]