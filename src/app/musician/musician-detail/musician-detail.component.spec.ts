/* tslint:disable:no-unused-variable */
import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';

import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from '@angular/router/testing';

import { MusicianDetailComponent } from './musician-detail.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Musician } from '../musician';
import { MusicianService } from '../musician.service';
import * as faker from "faker";

const musician:Musician = {id:1, name: faker.name.findName(), image: faker.image.imageUrl(), description: faker.lorem.sentence(), albums: [], performerPrizes: [], birthDate: faker.date.past()}

describe('MusicianDetailComponent', () => {
  let component: MusicianDetailComponent;
  let fixture: ComponentFixture<MusicianDetailComponent>;
  let debug: DebugElement;
  let service: MusicianService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicianDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    service = TestBed.inject(MusicianService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianDetailComponent);
    component = fixture.componentInstance;
    component.musicianDetail = musician;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should toggle', () => {
    component.toggle();
    expect(component.returnEvent).toBeTruthy();
  })

  it("Should have a musician detailed element ", () => {
    debug = fixture.debugElement;
    expect(debug.query(By.css("h1")).nativeElement.innerText).toContain(component.musicianDetail.name);
  });

  it("Should get musicianDetail", () => {
    component.getMusicianDetail();
    expect(component.musicianDetail).toBeTruthy()
  });

  it('Should get an musicianDetail', fakeAsync(()=>{
    spyOn(service, 'getMusicianDetail').and.returnValue(of(musician).pipe(delay(1)));
    component.getMusicianDetail();
    tick(1);
    expect(component.musicianDetail).toEqual(musician);
  }));

  it('Activate Album creation', () => {
    component.activateBandAssign(true);
    expect(component.bandAssignMenu).toBeTruthy();
    component.activateBandAssign(false);
    expect(component.bandAssignMenu).toBeFalsy();
  });
});
