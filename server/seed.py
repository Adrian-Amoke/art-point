# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Artist, Project, Collaboration

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        print("Dropping and creating tables")
        db.drop_all()
        db.create_all()

        print("Creating fake artists")
        artists = []
        for _ in range(5):  
            artist = Artist(
                name=fake.name(),
                email=fake.unique.email(),
                bio=fake.sentence(nb_words=6)
            )
            db.session.add(artist)
            artists.append(artist)

        print("Creating fake projects")
        projects = []
        for _ in range(5):  
            project = Project(
                title=fake.catch_phrase(),
                description=fake.paragraph(nb_sentences=2),
                medium=rc(["Digital", "Ink", "Watercolor", "Acrylic"]),
                artist=rc(artists)
            )
            db.session.add(project)
            projects.append(project)

        print("Creating fake collaborations")
        for _ in range(10):  
            project = rc(projects)
            artist = rc(artists)

            # Avoid self-collaboration
            if artist.id == project.artist.id:
                continue

            collab = Collaboration(
                contribution_note=fake.sentence(nb_words=8),
                tool_used=rc(["Photoshop", "Procreate", "Pen", "Ink", "Pencil"]),
                artist=artist,
                project=project
            )
            db.session.add(collab)

        print("Committing to DB")
        db.session.commit()
        print("Seeding is Complete")