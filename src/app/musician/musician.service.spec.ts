/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from "@angular/core/testing";
import { MusicianService } from './musician.service';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";

import * as faker from "faker";
import { Musician } from "./musician";
import { environment } from "../../environments/environment";

describe('Service: Musician', () => {
  let service: MusicianService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "musicians";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicianService]
    });
    service = TestBed.inject(MusicianService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("getMusicians() should return 10 records", () => {
    let mockMusicians: Musician[] = [];

    for (let i = 1; i < 11; i++) {
      let musician = new Musician(
        i,
        faker.lorem.sentence(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        [],[],
        faker.date.past()
      );

      mockMusicians.push(musician);
    }

    service.getMusicians().subscribe((musicians) => {
      expect(musicians.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockMusicians);
  });

  it("getMusicianDetail(id) of a musician which exists", () => {
    let mockMusician = new Musician(
      1,
      faker.lorem.sentence(),
      faker.image.imageUrl(),
      faker.lorem.sentence(),
      [],[],
      faker.date.past()
    );

    service.getMusicianDetail(1).subscribe((requestedMusician) => {
      expect(requestedMusician).toEqual(mockMusician);
    });

    const req = httpMock.expectOne(apiUrl + "/1");
    expect(req.request.method).toBe("GET");
    req.flush(mockMusician);
  });

  it("getBands()", () => {
    service.getBandas().subscribe( (bands) =>{
      expect(bands).toBeTruthy()
    })

    const req = httpMock.expectOne(environment.baseUrl + "bands");
    expect(req.request.method).toBe("GET");
    req.flush({});
  });

  it('addMusicianToBand', () => {
      service.addMusicianToBand(1,1).subscribe((result) => {
        expect(result).toBeTruthy()
      })

      const req = httpMock.expectOne(`${environment.baseUrl}bands/1/musicians/1`);
      expect(req.request.method).toBe("POST");
      req.flush({});
  });

});
