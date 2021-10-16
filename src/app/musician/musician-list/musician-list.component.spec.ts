import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from "@angular/platform-browser";
import { DebugElement } from '@angular/core';
import { MusicianListComponent } from './musician-list.component';
import { Musician } from '../musician';
import { MusicianService } from '../musician.service';
import * as faker from "faker";
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';

const musician:Musician = {id:1, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], birthDate: faker.date.past()}
const fakeMusician:Musician = {id:12, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], birthDate: faker.date.past()}
const musicians:Musician[] = [musician]

describe('MusicianListComponent', () => {
  let component: MusicianListComponent;
  let fixture: ComponentFixture<MusicianListComponent>;
  let debug: DebugElement;
  let service: MusicianService;

  beforeEach(async(() => {
    let mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MusicianListComponent],
      providers: [
        { provide: Router, useValue: mockRouter},
      ]
    }).compileComponents();

    service = TestBed.inject(MusicianService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianListComponent);
    component = fixture.componentInstance;
    component.musicians = musicians;
    component.filteredMusicians = musicians;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should have a musician card element ", () => {
    expect(debug.query(By.css('h2')).nativeElement.innerText).toContain(
      component.filteredMusicians[0].name
    );

    expect(debug.query(By.css("p")).nativeElement.innerText).toContain(
      component.filteredMusicians[0].description
    );
  });

  it("Should show all the musicians of the system", () => {
    component.getMusicians();
    expect(component.filteredMusicians.length).toBe(1);
    expect(component.musicians.length).toBe(1);
  });

  it("Should show all the musicians because there is not text in the filter", () => {
    component.filterMusicians("");
    expect(component.filteredMusicians.length).toBe(1);
    expect(component.musicians.length).toBe(1);
  });

  it("Should show all the musicians because the text is null", () => {
    component.filterMusicians(null);
    expect(component.filteredMusicians.length).toBe(1);
    expect(component.musicians.length).toBe(1);
  });

  it("Should show any filtered musicians", () => {
    component.filterMusicians("roberto carlos");
    expect(component.filteredMusicians.length).toBe(0);
    expect(component.musicians.length).toBe(1);
  });

  it("Should take the value given", () => {
    component.unselectMusician(false);
    expect(component.selected).toBe(false);
  });

  it("Should select musician", () => {
    component.onSelectedMusician(component.musicians[0]);
    component.selectedMusician = component.musicians[0];
    expect(component.selectedMusician).toBeTruthy()
  });

  it('get musicians', fakeAsync(()=>{
    spyOn(service, 'getMusicians').and.returnValue(of(musicians).pipe(delay(1)));
    component.getMusicians();
    tick(1);
    expect(component.musicians.length).toBe(1);
    expect(component.filterMusicians.length).toBe(1);
  }));

  it('get info of a real musician', fakeAsync(()=>{
    spyOn(service, 'getMusicianDetail').and.returnValue(of(musician).pipe(delay(1)));
    component.onSelectedMusician(musician);
    tick(1);
    expect(component.selectedMusician).toEqual(musician);
    expect(component.selected).toBe(true);
  }));

  it('get info of a fake musician', fakeAsync(()=>{
    spyOn(service, 'getMusicianDetail').and.returnValue(of(null).pipe(delay(1)));
    component.onSelectedMusician(fakeMusician);
    tick(1);
    expect(component.selectedMusician).toEqual(undefined);
    expect(component.selected).toBe(false);
  }));
});
