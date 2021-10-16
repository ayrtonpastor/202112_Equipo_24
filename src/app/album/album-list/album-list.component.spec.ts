/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { AlbumDetail } from '../albumdetail';

import { AlbumListComponent } from './album-list.component';
import { AlbumService } from '../album.service';
import * as faker from 'faker';
import { GENRE } from 'src/app/genre/genre.enum';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';

const album:AlbumDetail = {id: 1, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}
const fakeAlbum:AlbumDetail = {id: 12, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}
const albums:AlbumDetail[] = [album]


describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let albumService: AlbumService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListComponent ],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    albumService = TestBed.inject(AlbumService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    component.albums = albums;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be display albums data', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.container .row .card .card-title').textContent
    ).toContain(component.albums[0].name);
  });


  it('Should select album', () => {
    component.onSelectedAlbum(component.albums[0])
    component.selectedAlbum= component.albums[0]
    expect(component.selectedAlbum).toBeTruthy()
  });

  it('get info of a real album', fakeAsync(()=>{
    spyOn(albumService, 'getAlbumDetail').and.returnValue(of(album).pipe(delay(1)));
    component.onSelectedAlbum(album);
    tick(1);
    expect(component.selectedAlbum).toEqual(album);
    expect(component.selected).toBe(true);
  }));

  it('get info of a fake album', fakeAsync(()=>{
    spyOn(albumService, 'getAlbumDetail').and.returnValue(of(null).pipe(delay(1)));
    component.onSelectedAlbum(fakeAlbum);
    tick(1);
    expect(component.selectedAlbum).toEqual(undefined);
    expect(component.selected).toBe(false);
  }));

  it('Activate Album creation', () => {
    component.createNewAlbum(true);
    expect(component.activateAlbumCreation).toBeTruthy();
    expect(component.selected).toBeFalse();
  });
});
