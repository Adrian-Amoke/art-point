from flask_restful import Resource
from flask import request
from models import Project
from config import db

class Projects(Resource):
    def get(self):
        projects = Project.query.all()
        result = []
        for p in projects:
            proj_dict = p.to_dict()
            proj_dict['artist_name'] = p.artist.name if p.artist else None
            result.append(proj_dict)
        return result, 200

    def post(self):
        data = request.get_json()
        project = Project(
            title=data['title'],
            description=data.get('description'),
            medium=data.get('medium'),
            artist_id=data['artist_id']
        )
        db.session.add(project)
        db.session.commit()
        return project.to_dict(), 201

class ProjectByID(Resource):
    def get(self, id):
        project = Project.query.get(id)
        return project.to_dict(), 200

    def patch(self, id):
        data = request.get_json()
        project = Project.query.get(id)
        for attr in data:
            setattr(project, attr, data[attr])
        db.session.commit()
        return project.to_dict(), 200

    def delete(self, id):
        project = Project.query.get(id)
        db.session.delete(project)
        db.session.commit()
        return {}, 204
