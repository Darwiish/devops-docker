from flask import Flask
import redis

app = Flask(__name__) # Initialize the Flask application

cache = redis.Redis(host='redis', port=6379, decode_responses=True) # Connect to Redis service defined in docker-compose.yml

@app.route('/')
def welcome():
    return "Welcome to the Flask-Redis Visit Counter!" # Return welcome message

@app.route('/count')
def count():
    hits = cache.incr('visit_count') # Increment visit count atomically, creates key if it doesn't exist
    return f"This page has been visited {hits} times." # Return visit count

# Run app on all interfaces, port 5000, debug mode on
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True) 