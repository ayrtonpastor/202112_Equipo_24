import { Track } from './track';
import * as faker from 'faker';
import { AlbumDetail } from '../album/albumdetail';

describe('Track', () => {
  it('should create an instance', () => {
    let album : AlbumDetail;

    expect(new Track(
      faker.datatype.number(),
      faker.name.findName(),
      faker.lorem.sentence(),
      album
    )).toBeTruthy();
  });
});
