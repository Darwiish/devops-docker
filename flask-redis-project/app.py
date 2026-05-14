from flask import Flask
import redis

app = Flask(__name__) # Initialize the Flask application

cache = redis.Redis(host='redis', port=6379, decode_responses=True) # Connect to Redis service defined in docker-compose.yml

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
    hits = cache.incr('visit_count') # Increment visit count atomically, creates key if it doesn't exist
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
    app.run(host='0.0.0.0', port=5002, debug=True) # Run app on all interfaces, port 5002, debug mode on