import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { AlbumDetail } from 'src/app/album/albumdetail';
import { CollectorService } from '../collector.service';
import * as faker from 'faker';
import { CollectorAlbumCreateComponent } from './collector-album-create.component';
import { GENRE } from 'src/app/genre/genre.enum';
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { of } from 'rxjs';
import { CollectorAlbum } from 'src/app/collectoralbum/collectoralbum';
import { ALBUM_STATUS } from 'src/app/albumstatus/albumstatus.enum';

describe('CollectorAlbumCreateComponent', () => {
  let component: CollectorAlbumCreateComponent;
  let fixture: ComponentFixture<CollectorAlbumCreateComponent>;
  let service: CollectorService;

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
      declarations: [ CollectorAlbumCreateComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: toastrService }
       ]
    })
    .compileComponents();

    service = TestBed.inject(CollectorService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorAlbumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cancel createCollectorAlbum creation', ()=> {
    component.cancelCreation()
    component.emitReturnEvent()
    component.showSuccess({})
  })

  it('should create collector', fakeAsync(() => {
    let collectorAlbum = new CollectorAlbum(
      faker.datatype.number(),
      faker.datatype.number(),
      ALBUM_STATUS.ACTIVE,
      null,
      null
    )
    spyOn(service, 'createCollectorAlbum').and.returnValue(of(collectorAlbum))
    tick(1);
  }

  ))

  it('createcollectorAlbum', ()=> {
    component.createCollectorAlbum({'id': 1})
  }


  )
});
