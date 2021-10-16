import { Comment } from './comment';
import * as faker from 'faker';
import { CollectorDetail } from '../collector/collector-detail';
import { AlbumDetail } from '../album/albumdetail';

describe('Comment', () => {
  it('should create an instance', () => {
    let collector : CollectorDetail;
    let album : AlbumDetail;
    expect(new Comment(
      faker.lorem.sentence(),
      faker.datatype.number(),
      collector,
      faker.datatype.number(),
      album
    )).toBeTruthy();
  });
});
