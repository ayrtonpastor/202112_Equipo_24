/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import * as faker from "faker";
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommentCreatorComponent } from './comment-creator.component';
import { CommentService } from '../comment.service';
import { Comment } from '../comment';
import { CollectorDetail } from '../../collector/collector-detail';
import { AlbumDetail } from 'src/app/album/albumdetail';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { GENRE } from "src/app/genre/genre.enum";

const collector:CollectorDetail = {id: 1,
  name: faker.name.findName(),
  telephone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  favoritePerformers: [],
  comments: [],
  collectorAlbums: [],
};

const comment:Comment = {id:1, description: faker.lorem.sentence(), rating: 4, collector: collector};
const album:AlbumDetail = {id: 1, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}


describe('CommentCreatorComponent', () => {
  let component: CommentCreatorComponent;
  let fixture: ComponentFixture<CommentCreatorComponent>;
  let service: CommentService;


  beforeEach(async(() => {
    const toastrService = {
      success: (
        message?: string,
        title?: string,
        override?: Partial<IndividualConfig>
      ) => {},
      error: (
        message?: string,
        title?: string,
        override?: Partial<IndividualConfig>
      ) => {},
    };

    TestBed.configureTestingModule({
      declarations: [ CommentCreatorComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: toastrService }
       ]
    }).compileComponents();

    service = TestBed.inject(CommentService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCreatorComponent);
    component = fixture.componentInstance;
    component.albumDetail = album;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cancel adding favorite musician', ()=> {
    component.cancelCreation();
    component.emitReturnEvent();
    component.showSuccess(comment);
  })

  it('should create collector', fakeAsync(() => {
    spyOn(service, 'addComment').and.returnValue(of(comment));
    tick(1);
  }));

  it('favoriteMusicianCreation', ()=> {
    component.createComment(comment);
  });
});
