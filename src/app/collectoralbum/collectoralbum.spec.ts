import { CollectorAlbum } from './collectoralbum';
import * as faker from 'faker';
import { ALBUM_STATUS } from '../albumstatus/albumstatus.enum';
import { Album } from '../album/album';
import { CollectorDetail } from '../collector/collector-detail';

describe('Collectoralbum', () => {
  it('should create an instance', () => {
    let album : Album;
    let collector : CollectorDetail;

    expect(new CollectorAlbum(
      faker.datatype.number(),
      faker.datatype.number(),
      ALBUM_STATUS.ACTIVE,
      album,
      collector
    )).toBeTruthy();
  });
});
