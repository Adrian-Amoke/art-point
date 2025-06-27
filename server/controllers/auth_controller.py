from flask import request, jsonify
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash
from server.models import Artist
from server.config import db
import jwt
import datetime
from functools import wraps
from server.config import app

SECRET_KEY = "your_secret_key_here"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_artist = Artist.query.filter_by(id=data['artist_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_artist, *args, **kwargs)
    return decorated

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        bio = data.get('bio', '')

        if not name or not email or not password:
            return {'message': 'Name, email and password are required'}, 400

        existing_artist = Artist.query.filter_by(email=email).first()
        if existing_artist:
            return {'message': 'User already exists. Please log in.'}, 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_artist = Artist(name=name, email=email, bio=bio)
        # Store hashed_password in a new column in Artist model (to be added)
        new_artist.password = hashed_password

        db.session.add(new_artist)
        db.session.commit()

        token = jwt.encode({'artist_id': new_artist.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, SECRET_KEY, algorithm="HS256")

        return {'token': token, 'artist': {'id': new_artist.id, 'name': new_artist.name, 'email': new_artist.email, 'bio': new_artist.bio}}, 201

class SignIn(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return {'message': 'Email and password are required'}, 400

        artist = Artist.query.filter_by(email=email).first()
        if not artist or not check_password_hash(artist.password, password):
            return {'message': 'Invalid email or password'}, 401

        token = jwt.encode({'artist_id': artist.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, SECRET_KEY, algorithm="HS256")

        return {'token': token, 'artist': {'id': artist.id, 'name': artist.name, 'email': artist.email, 'bio': artist.bio}}, 200

# Add routes to the API in config.py or app.py
