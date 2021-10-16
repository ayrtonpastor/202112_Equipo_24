import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as faker from "faker";
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { DebugElement } from '@angular/core';

import { Musician } from '../musician/musician';
import { MusicianService } from '../musician/musician.service';
import { AlbumService } from '../album/album.service';
import { AlbumDetail } from '../album/albumdetail';
import { GENRE } from 'src/app/genre/genre.enum';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { CollectorDetail } from '../collector/collector-detail';
import { CollectorService } from '../collector/collector.service';
import { PaginaPrincipalComponent } from './pagina-principal.component';


const musician:Musician = {id:1, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], birthDate: faker.date.past()}
const musicians:Musician[] = [musician]

const album:AlbumDetail = {id: 1, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}
const albums:AlbumDetail[] = [album]

const collector:CollectorDetail = {id: 1, name: faker.name.findName(), telephone: faker.phone.phoneNumber(), email: faker.internet.email(),
  favoritePerformers: [], comments: [], collectorAlbums: []}
const collectors:CollectorDetail[] = [collector]


describe('PaginaPrincipalComponent', () => {
  let component: PaginaPrincipalComponent;
  let fixture: ComponentFixture<PaginaPrincipalComponent>;
  let debug: DebugElement;
  let musicianService: MusicianService;
  let albumService: AlbumService;
  let collectorService: CollectorService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaPrincipalComponent ],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    musicianService = TestBed.inject(MusicianService);
    albumService = TestBed.inject(AlbumService);
    collectorService = TestBed.inject(CollectorService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPrincipalComponent);
    component = fixture.componentInstance;
    component.musicos = musicians;
    component.albumes = albums;
    component.coleccionistas = collectors;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get musicians, albums and collectors', fakeAsync(()=>{
    spyOn(musicianService, 'getMusicians').and.returnValue(of(musicians).pipe(delay(1)));
    spyOn(albumService, 'getAlbums').and.returnValue(of(albums).pipe(delay(1)));
    spyOn(collectorService, 'getCollectors').and.returnValue(of(collectors).pipe(delay(1)));
    component.ngOnInit();
    tick(1);
    expect(component.musicos.length).toBe(1);
    expect(component.albumes.length).toBe(1);
    expect(component.coleccionistas.length).toBe(1);
  }));
});
