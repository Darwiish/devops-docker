FROM python:3.10

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config

RUN pip install --upgrade pip
RUN pip install flask mysqlclient

EXPOSE 5002

CMD ["python", "app.py"]