import {
  TestBed,
  ComponentFixture,
  async,
  inject,
  getTestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CollectorDetailComponent } from './collector-detail.component';

import * as faker from 'faker';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CollectorDetail } from '../collector-detail';
import { CollectorService } from '../collector.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Album } from 'src/app/album/album';
import { GENRE } from 'src/app/genre/genre.enum';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { Router } from '@angular/router';

const collector: CollectorDetail = {
  id: 1,
  name: faker.name.findName(),
  telephone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  favoritePerformers: [],
  comments: [],
  collectorAlbums: [],
};

describe('CollectorDetailComponent', () => {
  let component: CollectorDetailComponent;
  let fixture: ComponentFixture<CollectorDetailComponent>;
  let service: CollectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectorDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    service = TestBed.inject(CollectorService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDetailComponent);
    component = fixture.componentInstance;
    component.collectorDetail = collector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have name in collector-detail', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('#collector-detail h1').textContent
    ).toContain(component.collectorDetail.name);
  });

  it('Should toggle', () => {
    component.toggle();
    expect(component.returnEvent).toBeTruthy();
  });

  it('Collector detail', () => {
    component.getCollectorDetail();
    expect(component.collectorDetail).toBeTruthy();
  });

  it('Should get an collectorDetail', fakeAsync(() => {
    spyOn(service, 'getCollectorDetail').and.returnValue(
      of(collector).pipe(delay(1))
    );
    component.getCollectorDetail();
    tick(1);
    expect(component.collectorDetail).toEqual(collector);
  }));

  it('Activate Album creation', () => {
    component.activateAlbumCreation(true);
    expect(component.createAlbumSelected).toBeTruthy();
    component.activateAlbumCreation(false);
    expect(component.createAlbumSelected).toBeFalsy();
  });

  it('Activate favorite musician creation', () => {
    component.activateFavMusicianCreation(true);
    expect(component.createFavMusician).toBeTruthy();
    component.activateFavMusicianCreation(false);
    expect(component.createFavMusician).toBeFalsy();
  });
});
