/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from "@angular/core/testing";
import { BandService } from './band.service';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";

import * as faker from "faker";
import { BandDetail } from "./band-detail";
import { environment } from "../../environments/environment";

describe('Service: Musician', () => {
  let service: BandService;
  let httpMock: HttpTestingController;
  let apiUrl = environment.baseUrl + "bands";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BandService]
    });
    service = TestBed.inject(BandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("getMusicians() should return 10 records", () => {
    let mockBands: BandDetail[] = [];

    for (let i = 1; i < 11; i++) {
      let band = new BandDetail(
        i,
        faker.name.findName(),
        faker.image.imageUrl(),
        faker.lorem.sentence(),
        [],[],
        faker.date.past(), []);

      mockBands.push(band);
    }

    service.getBands().subscribe((bands) => {
      expect(bands.length).toBe(10);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe("GET");
    req.flush(mockBands);
  });

  it("getBandDetail(id) of a band which exists", () => {
    let mockBand = new BandDetail(
      1,
      faker.name.findName(),
      faker.image.imageUrl(),
      faker.lorem.sentence(),
      [],[],
      faker.date.past(), []);

    service.getBandDetail(1).subscribe((requestedBand) => {
      expect(requestedBand).toEqual(mockBand);
    });

    const req = httpMock.expectOne(apiUrl + "/1");
    expect(req.request.method).toBe("GET");
    req.flush(mockBand);
  });

  it("getBands()", () => {
    service.getBands().subscribe( (bands) =>{
      expect(bands).toBeTruthy()
    })

    const req = httpMock.expectOne(environment.baseUrl + "bands");
    expect(req.request.method).toBe("GET");
    req.flush({});
  });
});
