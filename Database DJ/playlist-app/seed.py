"""Seed file to make sample data for db."""
from models import db, connect_db, Playlist, Song, PlaylistSong
from app import app

# Create all tables
db.drop_all()
db.create_all()