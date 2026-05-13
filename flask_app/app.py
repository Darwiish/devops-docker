from flask import Flask
import MySQLdb
import os

app = Flask(__name__)

@app.route('/')
def hello_world():
    db = MySQLdb.connect(
        host=os.getenv("MYSQL_HOST"),
        user=os.getenv("MYSQL_USER"),
        passwd=os.getenv("MYSQL_PASSWORD"),
        db=os.getenv("MYSQL_DATABASE")
    )

    cur = db.cursor()
    cur.execute("SELECT VERSION()")
    version = cur.fetchone()

    return f"Hello, World! MySQL version: {version[0]}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)