import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from "@angular/platform-browser";
import { DebugElement } from '@angular/core';
import { BandListComponent } from './band-list.component';
import { BandDetail } from '../band-detail';
import { BandService } from '../band.service';
import * as faker from "faker";
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';

const band:BandDetail = {id:1, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], creationDate: faker.date.past(), musicians: []}
const fakeBand:BandDetail = {id:12, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], creationDate: faker.date.past(), musicians: []}
const bands:BandDetail[] = [band]

describe('BandListComponent', () => {
  let component: BandListComponent;
  let fixture: ComponentFixture<BandListComponent>;
  let debug: DebugElement;
  let service: BandService;

  beforeEach(async(() => {
    let mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [BandListComponent],
      providers: [
        { provide: Router, useValue: mockRouter},
      ]
    }).compileComponents();

    service = TestBed.inject(BandService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandListComponent);
    component = fixture.componentInstance;
    component.bands = bands;
    component.filteredBands = bands;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should have a band card element ", () => {
    expect(debug.query(By.css('h2')).nativeElement.innerText).toContain(
      component.filteredBands[0].name
    );

    expect(debug.query(By.css("p")).nativeElement.innerText).toContain(
      component.filteredBands[0].description
    );
  });

  it("Should show all the bands of the system", () => {
    component.getBands();
    expect(component.filteredBands.length).toBe(1);
    expect(component.bands.length).toBe(1);
  });

  it("Should show all the bands because there is not text in the filter", () => {
    component.filterBands("");
    expect(component.filteredBands.length).toBe(1);
    expect(component.bands.length).toBe(1);
  });

  it("Should show all the bands because the text is null", () => {
    component.filterBands(null);
    expect(component.filteredBands.length).toBe(1);
    expect(component.bands.length).toBe(1);
  });

  it("Should show any filtered bands", () => {
    component.filterBands("roberto carlos");
    expect(component.filteredBands.length).toBe(0);
    expect(component.bands.length).toBe(1);
  });

  it("Should take the value given", () => {
    component.unselectBand(false);
    expect(component.selected).toBe(false);
  });

  it("Should select band", () => {
    component.onSelectedBand(component.bands[0]);
    component.selectedBand = component.bands[0];
    expect(component.selectedBand).toBeTruthy()
  });

  it('get bands', fakeAsync(()=>{
    spyOn(service, 'getBands').and.returnValue(of(bands).pipe(delay(1)));
    component.getBands();
    tick(1);
    expect(component.bands.length).toBe(1);
    expect(component.filterBands.length).toBe(1);
  }));

  it('get info of a real band', fakeAsync(()=>{
    spyOn(service, 'getBandDetail').and.returnValue(of(band).pipe(delay(1)));
    component.onSelectedBand(band);
    tick(1);
    expect(component.selectedBand).toEqual(band);
    expect(component.selected).toBe(true);
  }));

  it('get info of a fake band', fakeAsync(()=>{
    spyOn(service, 'getBandDetail').and.returnValue(of(null).pipe(delay(1)));
    component.onSelectedBand(fakeBand);
    tick(1);
    expect(component.selectedBand).toEqual(undefined);
    expect(component.selected).toBe(false);
  }));
});
