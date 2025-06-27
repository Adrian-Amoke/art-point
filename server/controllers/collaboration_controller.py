from flask_restful import Resource
from flask import request
from models import Collaboration
from config import db

class Collaborations(Resource):
    def get(self):
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
