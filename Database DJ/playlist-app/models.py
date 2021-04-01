"""Models for Playlist app."""
from flask_sqlalchemy import SQLAlchemy,sqlalchemy
import os

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""

    __tablename__ = "playlists"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.String(100),
                     nullable=False)
    description = db.Column(db.Text , nullable=False)

    playlists_songs = db.relationship("PlaylistSong" , backref="playlist" , cascade="all, delete" , passive_deletes=True)
    songs = db.relationship("Song" , secondary="playlists_songs" , backref="playlists")


class Song(db.Model):
    """Song."""

    __tablename__ = "songs"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.String(100) , nullable=False)
    artist = db.Column(db.String(100) , nullable=False)

    playlists_songs = db.relationship("PlaylistSong" , backref="song" , cascade="all, delete" , passive_deletes=True)
    
class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    __tablename__ = "playlists_songs"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    playlist_id = db.Column(db.Integer , db.ForeignKey('playlists.id' , ondelete="CASCADE") , nullable=False)
    song_id = db.Column(db.Integer , db.ForeignKey('songs.id' , ondelete='CASCADE') , nullable=False)



# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
