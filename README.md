# Art Point - Full Stack Art Collaboration Platform

## Project Overview

Art Point is a full-stack web application that allows artists to showcase their work, create projects, and collaborate with other artists. The backend is built with Flask and Flask-RESTful, while the frontend is a React application.

## Directory Structure

```
.
├── client/                 # React frontend application
├── server/                 # Flask backend API
├── migrations/             # Database migrations
├── Pipfile                 # Python dependencies
├── Pipfile.lock
├── render.yaml             # Render deployment configuration
└── README.md
```

## Features

- User authentication (sign up, sign in)
- Artist profiles and listings
- Project creation and management
- Collaboration requests on projects
- Responsive and modern UI with React

## Local Setup

### Backend

1. Navigate to the `server` directory:

```bash
cd server
```

2. Install dependencies and activate the virtual environment:

```bash
pipenv install
pipenv shell
```

3. Initialize and migrate the database:

```bash
flask db init
flask db upgrade head
```

4. Run the Flask server:

```bash
python app.py
```

The backend API will be available at `http://localhost:5555`.

### Frontend

1. Navigate to the `client` directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Run the React development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.
