import { AlbumDetail } from './albumdetail';
import * as faker from 'faker';
import { GENRE } from '../genre/genre.enum';
import { RECORD_LABEL } from '../recordlabel/recordlabel.enum';
import { Performer } from '../performer/performer';
import { Track } from '../track/track';
import { CollectorAlbum } from '../collectoralbum/collectoralbum';
import { Comment } from '../comment/comment';

describe('Albumdetail', () => {
  it('should create an instance', () => {
    let performers : Performer[];
    let tracks : Track[];
    let comments : Comment[];
    let collectorAlbums : CollectorAlbum[];

    expect(new AlbumDetail(
      faker.datatype.number(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.date.past(),
      faker.lorem.sentence(),
      GENRE.CLASSICAL,
      RECORD_LABEL.SONY,
      //performers,
      //tracks,
      //comments,
      //collectorAlbums,
    )).toBeTruthy();
  });
});
