from flask import Flask
import redis
import os

app = Flask(__name__) # Initialize the Flask application

REDIS_HOST = os.getenv('REDIS_HOST', 'redis') # Get Redis host from environment
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379)) # Get Redis port from environment
REDIS_DB = int(os.getenv('REDIS_DB', 0)) # Get Redis DB from environment

cache = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=REDIS_DB,
    decode_responses=True
) # Initialize Redis client

@app.route('/')
def welcome():
    return '''
    <html>
        <body style="font-family: Arial; text-align: center; margin-top: 100px;">
            <h1>Welcome to the Flask-Redis Visit Counter!</h1>
            <a href="/count">Go to Counter</a>
        </body>
    </html>
    ''' # Return welcome message as HTML

@app.route('/count')
def count():
    hits = cache.incr('visit_count') # Increment visit count atomically
    return f'''
    <html>
        <body style="font-family: Arial; text-align: center; margin-top: 100px;">
            <h1>Visit Counter</h1>
            <h2>This page has been visited <span style="color: red;">{hits}</span> times.</h2>
            <a href="/count">Refresh Count</a> | <a href="/">Home</a>
        </body>
    </html>
    ''' # Return visit count as HTML

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) # Run app on all interfaces, port 5002