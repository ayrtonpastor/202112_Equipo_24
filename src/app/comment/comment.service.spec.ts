/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CommentService } from './comment.service';
import { Comment } from './comment';
import * as faker from 'faker';
import { CollectorDetail } from '../collector/collector-detail';
import { AlbumDetail } from '../album/albumdetail';
import { GENRE } from 'src/app/genre/genre.enum';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';

const collector:CollectorDetail = {id: 1, name: faker.name.findName(), telephone: faker.phone.phoneNumber(), email: faker.internet.email(),favoritePerformers: [], comments: [], collectorAlbums: []}
const album:AlbumDetail = {id: 1, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
  description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []}

describe('Service: Comment', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let commentService: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    commentService = TestBed.inject(CommentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add a comment and return it', () => {
    const newComment: Comment = { description: 'Este es un comentario válido', rating: 5, collector: collector };

    commentService.addComment(album.id, newComment).subscribe(
      data => expect(data).toEqual(newComment, 'should return the comment'),
      fail
    );

    const req = httpTestingController.expectOne(commentService.apiUrl+'/'+album.id+'/comments');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newComment);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: newComment });
    req.event(expectedResponse);
  });
});
