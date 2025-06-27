from flask import Flask
from flask_migrate import Migrate
from config import app, db

migrate = Migrate(app, db)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

