import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MusicianService } from '../musician.service';

import { MusicianbandCreateComponent } from './musicianband-create.component';

describe('MusicianbandCreateComponent', () => {
  let component: MusicianbandCreateComponent;
  let fixture: ComponentFixture<MusicianbandCreateComponent>;
  let service: MusicianService

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
      declarations: [ MusicianbandCreateComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: toastrService }
       ]
    })
    .compileComponents();

    service = TestBed.inject(MusicianService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianbandCreateComponent);
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
    spyOn(service, 'addMusicianToBand').and.returnValue(of({}));
    tick(1);
  }));

});
