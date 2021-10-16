/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as faker from 'faker';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { GENRE } from "src/app/genre/genre.enum";

import { AlbumCreateComponent } from '../album-create/album-create.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumDetail } from '../albumdetail';
import { AlbumService } from '../album.service';
import { Track } from 'src/app/track/track';
import { AlbumTrackCreateComponent } from "../album-track-create/album-track-create.component";


const track: Track = {
  id: 1, name: faker.name.findName(), duration: "10:10", album: {
    id: 1, name: faker.name.findName(), cover: faker.image.imageUrl(), releaseDate: faker.date.past(),
    description: faker.lorem.sentence(), genre: GENRE.CLASSICAL, recordLabel: RECORD_LABEL.EMI, tracks: [], performers: [], comments: []
  }
}

describe('AlbumTrackCreateComponent', () => {
  let component: AlbumTrackCreateComponent;
  let fixture: ComponentFixture<AlbumTrackCreateComponent>;
  let service: AlbumService;

  beforeEach(async(() => {
    const toastrService = {
      success: (
        message?: string,
        title?: string,
        override?: Partial<IndividualConfig>
      ) => { },
      error: (
        message?: string,
        title?: string,
        override?: Partial<IndividualConfig>
      ) => { },
    };
    TestBed.configureTestingModule({
      declarations: [AlbumTrackCreateComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: toastrService }
      ]
    }).compileComponents();

    service = TestBed.inject(AlbumService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumTrackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cancel adding track to album', ()=> {
    component.cancelCreation();
    component.emitReturnEvent();
    component.showSuccess(track);
  });

  it('should create a track', fakeAsync(() => {
    spyOn(service, 'addNewTrack').and.returnValue(of(track));
    tick(1);
  }));

});
