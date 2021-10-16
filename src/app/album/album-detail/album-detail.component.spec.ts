/* tslint:disable:no-unused-variable */
import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumDetailComponent } from './album-detail.component';
import { RouterTestingModule } from '@angular/router/testing';

import * as faker from 'faker';
import { GENRE } from 'src/app/genre/genre.enum';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { AlbumDetail } from '../albumdetail';
import { AlbumService } from '../album.service';

const album:AlbumDetail = {id: 1, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}
const fakeAlbum:AlbumDetail = {id: 12, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}

describe('AlbumDetailComponent', () => {
  let component: AlbumDetailComponent;
  let fixture: ComponentFixture<AlbumDetailComponent>;
  let debug: DebugElement;
  let albumService: AlbumService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    albumService = TestBed.inject(AlbumService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetailComponent);
    component = fixture.componentInstance;
    component.albumDetail = album;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component.albumDetail).toBeTruthy();
  });

  it("Should have an album detailed element ", () => {
    debug = fixture.debugElement;
    expect(debug.query(By.css("h1")).nativeElement.innerText).toContain(component.albumDetail.name);
  });

  it("Should get albumDetail", () => {
    component.getAlbumDetail();
    expect(component.albumDetail).toBeTruthy()
  });

  it('Should get an albumDetail', fakeAsync(()=>{
    spyOn(albumService, 'getAlbumDetail').and.returnValue(of(album).pipe(delay(1)));
    component.getAlbumDetail();
    tick(1);
    expect(component.albumDetail).toEqual(album);
  }));

  it('Activate add comment', () => {
    component.activateAddComment(true);
    expect(component.addCommentSelected).toBeTruthy();
    component.activateAddComment(false);
    expect(component.addCommentSelected).toBeFalsy();
  });
});
