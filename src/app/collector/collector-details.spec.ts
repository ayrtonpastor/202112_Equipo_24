import { CollectorDetail } from './collector-detail';
import * as faker from 'faker';
import { Performer } from '../performer/performer';
import { CollectorAlbum } from '../collectoralbum/collectoralbum';

describe('CollectorDetail', () => {
  it('should create an instance', () => {
    let favoritePerformers: Performer[];
    let collectorAlbums: CollectorAlbum[];
    let comments: Comment[];
    expect(
      new CollectorDetail(
        faker.datatype.number(),
        faker.name.findName(),
        faker.phone.phoneNumber(),
        faker.internet.email(),
        favoritePerformers,
        comments,
        collectorAlbums
      )
    ).toBeTruthy();
  });
});
