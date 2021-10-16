import { DebugElement } from '@angular/core';
import { TestBed,  ComponentFixture, async, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { CollectorDetail } from '../collector-detail';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CollectorListComponent } from './collector-list.component';
import * as faker from 'faker';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectorService } from '../collector.service';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';
import { Router } from '@angular/router';

const collector:CollectorDetail = {id: 1, name: faker.name.findName(), telephone: faker.phone.phoneNumber(), email: faker.internet.email(),favoritePerformers: [], comments: [], collectorAlbums: []}
const collectors:CollectorDetail[] = [collector]

describe('CollectorListComponent', () => {
  let component: CollectorListComponent;
  let fixture: ComponentFixture<CollectorListComponent>;
  let service: CollectorService;

  beforeEach(async () => {
    let mockRouter = {
      navigate: jasmine.createSpy('navigate')
    }
    await TestBed.configureTestingModule({
      declarations: [CollectorListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter},
      ]
    }).compileComponents();
    service = TestBed.inject(CollectorService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorListComponent);
    component = fixture.componentInstance;
    component.collectors = collectors;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a card in collectors-list', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.container-fluid .card .card-title').textContent
    ).toContain(component.collectors[0].name);
  });

  it('Should get collectors', ()=> {
    component.getCollectors();
    expect(component.collectors).toBeTruthy();
  });

  it('Performers Name', ()=> {
    expect(component.getFavoritePerformersName(component.collectors[0])).toBeTruthy();

  });

  it('onSelectedCollector', ()=> {
    component.onSelectedCollector(component.collectors[0])
    component.selectedCollector = component.collectors[0]
    expect(component.selectedCollector).toBeTruthy()
  });

  it('unSelectCollector', () => {
    component.unselectCollector(true)
    expect(component.selected).toBeTrue()
  });

  it('get collectors', fakeAsync(()=>{
    spyOn(service, 'getCollectors').and.returnValue(of(collectors).pipe(delay(1)));
    component.getCollectors();
    tick(1);
    expect(component.collectors.length).toBe(1);
  }));

  it('get info of a real collector', fakeAsync(()=>{
    spyOn(service, 'getCollectorDetail').and.returnValue(of(collector).pipe(delay(1)));
    component.onSelectedCollector(collector);
    tick(1);
    expect(component.selectedCollector).toEqual(collector);
    expect(component.selected).toBe(true);
  }));
});
