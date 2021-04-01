"""Forms for playlist app."""

from wtforms import SelectField , StringField , TextAreaField
from flask_wtf import FlaskForm
from wtforms.validators import InputRequired , Length


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    name = StringField('Name' , validators=[InputRequired(), Length(max=100)])
    description = TextAreaField('Description' , validators=[InputRequired()])


class SongForm(FlaskForm):
    """Form for adding songs."""

    title = StringField('Title' , validators=[InputRequired(), Length(max=100)])
    artist = StringField('Artist' , validators=[InputRequired(), Length(max=100)])


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
