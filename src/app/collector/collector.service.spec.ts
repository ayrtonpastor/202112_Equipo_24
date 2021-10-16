import { TestBed } from '@angular/core/testing';

import { CollectorService } from './collector.service';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import * as faker from 'faker';
import { environment } from '../../environments/environment';
import { CollectorDetail } from './collector-detail';
import { Performer } from '../performer/performer';
import { CollectorAlbum } from '../collectoralbum/collectoralbum';
import { Album } from '../album/album';
import { RECORD_LABEL } from '../recordlabel/recordlabel.enum';
import { GENRE } from '../genre/genre.enum';
import { ALBUM_STATUS } from '../albumstatus/albumstatus.enum';
import { Musician } from '../musician/musician';

describe('CollectorService', () => {
  let service: CollectorService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + 'collectors';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectorService],
    });
    service = TestBed.inject(CollectorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createCollectorAlbum', () => {
    let albumId = faker.datatype.number()
    let album = new Album(
      albumId,
      faker.name.findName(),
      faker.image.imageUrl(),
      faker.date.past(),
      faker.lorem.sentence(),
      GENRE.CLASSICAL,
      RECORD_LABEL.EMI
    );
    let collectorId = faker.datatype.number()
    let collectorMock = new CollectorDetail(
      collectorId,
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email(),
      [],
      [],
      []
    );

    service
      .createCollectorAlbum(
        collectorMock.id,
        album.id,
        faker.datatype.number(),
        ALBUM_STATUS.ACTIVE
      )
      .subscribe((collectorAlbum) => {
        expect(collectorAlbum).toBeTruthy();
      });

    let collectorAlbum: CollectorAlbum = new CollectorAlbum(
      faker.datatype.number(),
      faker.datatype.number(),
      ALBUM_STATUS.ACTIVE,
      album,
      collectorMock
    );
    const req = httpMock.expectOne(apiUrl+'/'+ collectorId + '/albums/' + albumId);
    expect(req.request.method).toBe('POST');
    req.flush(collectorAlbum);

  });

  it('getCollectors() should return 10 records', () => {
    let mockCollectors: CollectorDetail[] = [];

    for (let i = 1; i < 11; i++) {
      let favoritePerformers: Performer[];
      let collectorAlbums: CollectorAlbum[];
      let comments: Comment[];

      let collector = new CollectorDetail(
        i,
        faker.lorem.sentence(),
        faker.phone.phoneNumber(),
        faker.internet.email(),
        favoritePerformers,
        comments,
        collectorAlbums
      );

      mockCollectors.push(collector);
    }

    service.getCollectors().subscribe((collectors) => {
      expect(collectors.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCollectors);
  });

  it('getCollectorDetail() should return 1 record', () => {
    let favoritePerformers: Performer[] = [
      new Performer(
        faker.datatype.number(),
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        [],
        []
      ),
    ];

    let album = new Album(
      faker.datatype.number(),
      faker.name.findName(),
      faker.image.imageUrl(),
      faker.date.past(),
      faker.lorem.sentence(),
      GENRE.CLASSICAL,
      RECORD_LABEL.EMI
    );

    let collectorMock = new CollectorDetail(
      faker.datatype.number(),
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email(),
      favoritePerformers,
      [],
      []
    );

    let collectorAlbums: CollectorAlbum[] = [
      new CollectorAlbum(
        faker.datatype.number(),
        faker.datatype.number(),
        ALBUM_STATUS.ACTIVE,
        album,
        collectorMock
      ),
    ];
    collectorMock.collectorAlbums = collectorAlbums;

    service.getCollectorDetail(0).subscribe((collector) => {
      expect(collector).toBeTruthy();
    });

    const req_albums = httpMock.expectOne(apiUrl + '/0/albums');
    expect(req_albums.request.method).toBe('GET');
    req_albums.flush(collectorAlbums);

    const req = httpMock.expectOne(apiUrl + '/0');
    expect(req.request.method).toBe('GET');
    req.flush(collectorMock);
  });

  it('createFavoriteMusician', () => {
    let musician_id = faker.datatype.number();
    let musician = new Musician(
      musician_id,
      faker.lorem.sentence(),
      faker.image.imageUrl(),
      faker.lorem.sentence(),
      [],[],
      faker.date.past());

    let collector_id = faker.datatype.number()
    let collectorMock = new CollectorDetail(
      collector_id,
      faker.name.findName(),
      faker.phone.phoneNumber(),
      faker.internet.email(),
      [],[],[]);

    service.addFavoriteMusician(collectorMock.id,musician.id)
    .subscribe((collectorAlbum) => {
        expect(collectorAlbum).toBeTruthy();
      });

    const req = httpMock.expectOne(apiUrl+'/'+ collector_id + '/musicians/' + musician_id);
    expect(req.request.method).toBe('POST');
    req.flush(collectorMock.favoritePerformers);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
