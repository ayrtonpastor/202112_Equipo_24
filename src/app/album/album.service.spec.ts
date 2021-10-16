import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Album } from './album';

import { AlbumService } from './album.service';
import * as faker from "faker";
import { GENRE } from '../genre/genre.enum';
import { RECORD_LABEL } from '../recordlabel/recordlabel.enum';
import { AlbumDetail } from './albumdetail';

const album:AlbumDetail = {id: 1, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}

describe('AlbumService', () => {
  let service: AlbumService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + 'albums';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });
    service = TestBed.inject(AlbumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("getAlbums() should return 10 records", () => {
    let mockAlbums: Album[] = [];

    for (let i = 1; i < 11; i++) {
      let album = new Album(
        faker.datatype.number(),
        faker.name.findName(),
        faker.image.imageUrl(),
        faker.date.past(),
        faker.lorem.sentence(),
        GENRE.CLASSICAL,
        RECORD_LABEL.EMI
      );
      mockAlbums.push(album);
    }
    service.getAlbums().subscribe((albums) => {
      expect(albums.length).toBe(10);
    });
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockAlbums);
  });

  it("getAlbumDetail(id) of a album which exists", () => {
    let indice : number;
    let mockAlbumDetail = new AlbumDetail(
      indice = faker.datatype.number(),
      faker.name.findName(),
      faker.image.imageUrl(),
      faker.date.past(),
      faker.lorem.sentence(),
      GENRE.CLASSICAL,
      RECORD_LABEL.EMI
      //[],
      //[],
      //faker.lorem.sentence(),
    );
    service.getAlbumDetail(indice).subscribe((requestedAlbumDetail) => {
      expect(requestedAlbumDetail).toEqual(mockAlbumDetail);
    });
  console.log(apiUrl);
    const req = httpMock.expectOne(apiUrl + `/${indice}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockAlbumDetail);
  });

  it('addNewAlbum', () => {
    service.addNewAlbum(album).subscribe((result) => {
      expect(result).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.baseUrl}albums`);
    expect(req.request.method).toBe("POST");
    req.flush({});
  });
});
