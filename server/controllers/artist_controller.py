from flask_restful import Resource
from flask import request
from models import Artist
from config import db

class Artists(Resource):
    def get(self):
        artists = Artist.query.all()
        return [a.to_dict() for a in artists], 200

    def post(self):
        data = request.get_json()
        artist = Artist(name=data['name'], email=data['email'], bio=data.get('bio'))
        db.session.add(artist)
        db.session.commit()
        return artist.to_dict(), 201

class ArtistByID(Resource):
    def get(self, id):
        artist = Artist.query.get(id)
        return artist.to_dict(), 200

    def patch(self, id):
        data = request.get_json()
        artist = Artist.query.get(id)
        for attr in data:
            setattr(artist, attr, data[attr])
        db.session.commit()
        return artist.to_dict(), 200

    def delete(self, id):
        artist = Artist.query.get(id)
        db.session.delete(artist)
        db.session.commit()
        return {}, 204
