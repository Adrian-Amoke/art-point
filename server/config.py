from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://artist:passartist@localhost:5432/artistdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

CORS(app)

from controllers.artist_controller import Artists, ArtistByID
from controllers.project_controller import Projects, ProjectByID
from controllers.collaboration_controller import Collaborations

api.add_resource(Artists, '/artists')
api.add_resource(ArtistByID, '/artists/<int:id>')
api.add_resource(Projects, '/projects')
api.add_resource(ProjectByID, '/projects/<int:id>')
api.add_resource(Collaborations, '/collaborations')
