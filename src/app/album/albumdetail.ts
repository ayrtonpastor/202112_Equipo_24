import { CollectorAlbum } from '../collectoralbum/collectoralbum';
import { Comment } from '../comment/comment';
import { GENRE } from '../genre/genre.enum';
import { Performer } from '../performer/performer';
import { RECORD_LABEL } from '../recordlabel/recordlabel.enum';
import { Track } from '../track/track';
import { Album } from './album';


export class AlbumDetail extends Album {
  public tracks : Array<Track>;
  public performers : Array<Performer>;
  public comments : Array<Comment>;
}


/*
export class AlbumDetail extends Album {
  constructor(
    id : number,
    name: string,
    cover: string,
    releaseDate: Date,
    description: string,
    genre: GENRE,
    recordLabel: RECORD_LABEL,
    public performers: Performer[],
    public tracks: Track[],
    public comments: Comment[],
    public collectorAlbums: CollectorAlbum[]
  ){
    super(id, name, cover, releaseDate, description, genre, recordLabel);
  }
}
*/

