from flask_restful import Resource
from flask import request
from models import Collaboration
from config import db

class Collaborations(Resource):
    def get(self):
        collaborations = Collaboration.query.all()
        return [c.to_dict() for c in collaborations], 200

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
