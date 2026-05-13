 # FROM python:3.10-slim
#
# WORKDIR /app
#
# COPY . .
#
# RUN apt-get update && apt-get install -y \
#     default-libmysqlclient-dev \
#     build-essential \
#     pkg-config
#
# RUN pip install --upgrade pip
# RUN pip install flask mysqlclient
#
# EXPOSE 5002
#
# CMD ["python", "app.py"]

# Stage 1: Build stage
FROM python:3.8-slim as builder

WORKDIR /app

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config

COPY . .

# Install dependencies into a custom folder
RUN pip install --no-cache-dir --prefix=/install flask mysqlclient

# Stage 2: Production stage
FROM python:3.8-slim

WORKDIR /app

# Install runtime MySQL dependency
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY --from=builder /app /app

EXPOSE 5002

CMD ["python", "app.py"]