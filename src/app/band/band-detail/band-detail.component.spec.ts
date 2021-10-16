/* tslint:disable:no-unused-variable */
import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';

import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from '@angular/router/testing';

import { BandDetailComponent } from './band-detail.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BandDetail } from '../band-detail';
import { BandService } from '../band.service';
import * as faker from "faker";

const band:BandDetail = {id:1, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], creationDate: faker.date.past(), musicians: []}

describe('BandDetailComponent', () => {
  let component: BandDetailComponent;
  let fixture: ComponentFixture<BandDetailComponent>;
  let debug: DebugElement;
  let service: BandService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    service = TestBed.inject(BandService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandDetailComponent);
    component = fixture.componentInstance;
    component.bandDetail = band;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should toggle', () => {
    component.toggle();
    expect(component.returnEvent).toBeTruthy();
  })

  it("Should have a band detailed element ", () => {
    debug = fixture.debugElement;
    expect(debug.query(By.css("h1")).nativeElement.innerText).toContain(component.bandDetail.name);
  });

  it("Should get bandDetail", () => {
    component.getBandDetail();
    expect(component.bandDetail).toBeTruthy()
  });

  it('Should get an bandDetail', fakeAsync(()=>{
    spyOn(service, 'getBandDetail').and.returnValue(of(band).pipe(delay(1)));
    component.getBandDetail();
    tick(1);
    expect(component.bandDetail).toEqual(band);
  }));
});
