from flask_restful import Resource
from flask import request
from server.models import Collaboration
from server.config import db

class Collaborations(Resource):
    def get(self):
        artist_id = request.args.get('artist_id')
        if artist_id:
            collaborations = Collaboration.query.filter_by(artist_id=artist_id).all()
        else:
            collaborations = Collaboration.query.all()
        result = []
        for c in collaborations:
            collab_dict = c.to_dict()
            collab_dict['artist_name'] = c.artist.name if c.artist else None
            collab_dict['project_title'] = c.project.title if c.project else None
            collab_dict['project_owner_name'] = c.project.artist.name if c.project and c.project.artist else None
            result.append(collab_dict)
        return result, 200

    def post(self):
        data = request.get_json()
        collaboration = Collaboration(
            contribution_note=data['contribution_note'],
            tool_used=data['tool_used'],
            artist_id=data['artist_id'],
            project_id=data['project_id']
        )
        db.session.add(collaboration)
        db.session.commit()
        return collaboration.to_dict(), 201

class CollaborationByID(Resource):
    def get(self, id):
        collaboration = Collaboration.query.get(id)
        return collaboration.to_dict(), 200

    def patch(self, id):
        data = request.get_json()
        collaboration = Collaboration.query.get(id)
        for attr in data:
            setattr(collaboration, attr, data[attr])
        db.session.commit()
        return collaboration.to_dict(), 200

    def delete(self, id):
        collaboration = Collaboration.query.get(id)
        db.session.delete(collaboration)
        db.session.commit()
        return {}, 204
