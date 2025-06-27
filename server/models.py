from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db

class Artist(db.Model, SerializerMixin):
    __tablename__ = "artists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)

    projects = db.relationship("Project", backref="artist", cascade="all, delete-orphan")
    collaborations = db.relationship("Collaboration", backref="artist", cascade="all, delete-orphan")

    collaborated_projects = association_proxy("collaborations", "project")

    serialize_rules = ("-projects.artist", "-collaborations.artist")

class Project(db.Model, SerializerMixin):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    medium = db.Column(db.String)
    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))

    collaborations = db.relationship("Collaboration", backref="project", cascade="all, delete-orphan")
    collaborators = association_proxy("collaborations", "artist")

    serialize_rules = ("-artist.projects", "-collaborations.project")

class Collaboration(db.Model, SerializerMixin):
    __tablename__ = "collaborations"

    id = db.Column(db.Integer, primary_key=True)
    contribution_note = db.Column(db.String)
    tool_used = db.Column(db.String)

    artist_id = db.Column(db.Integer, db.ForeignKey("artists.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

    serialize_rules = ("-artist.collaborations", "-project.collaborations")