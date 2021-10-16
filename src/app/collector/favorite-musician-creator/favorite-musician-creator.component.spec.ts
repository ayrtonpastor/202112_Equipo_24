/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as faker from "faker";
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { MusicianService } from '../../musician/musician.service';
import { Musician } from "../../musician/musician";
import { FavoriteMusicianCreatorComponent } from './favorite-musician-creator.component';
import { CollectorDetail } from '../collector-detail';


const musician:Musician = {id:1, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], birthDate: faker.date.past()}
const musicians:Musician[] = [];
const collector: CollectorDetail = {
  id: 1,
  name: faker.name.findName(),
  telephone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  favoritePerformers: [],
  comments: [],
  collectorAlbums: [],
};

describe('FavoriteMusicianCreatorComponent', () => {
  let component: FavoriteMusicianCreatorComponent;
  let fixture: ComponentFixture<FavoriteMusicianCreatorComponent>;
  let service: MusicianService;


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
      declarations: [ FavoriteMusicianCreatorComponent ],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: toastrService }
       ]
      }).compileComponents();

      service = TestBed.inject(MusicianService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteMusicianCreatorComponent);
    component = fixture.componentInstance;
    component.musicians = musicians;
    component.collectorDetail = collector;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Cancel adding favorite musician', ()=> {
    component.cancelCreation();
    component.emitReturnEvent();
    component.showSuccess(musician);
  })

  it('should create collector', fakeAsync(() => {
    spyOn(service, 'addMusicianToBand').and.returnValue(of(musician));
    tick(1);
  }));

  it('favoriteMusicianCreation', ()=> {
    component.createFavoriteMusician(musician);
  });
});
