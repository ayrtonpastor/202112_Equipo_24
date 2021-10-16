import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Collector } from '../collector';
import { CollectorDetail } from '../collector-detail';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-list',
  templateUrl: './collector-list.component.html'
})
export class CollectorListComponent implements OnInit {
  collectors: CollectorDetail[];

  selectedCollector: CollectorDetail;
  selected = false;

  constructor(private collectorService: CollectorService, private router: Router) { }

  getCollectors(): void {
    this.collectorService.getCollectors().subscribe((collectors) => {
      this.collectors = collectors;
    });
  }

  getFavoritePerformersName(collector: CollectorDetail): string[] {
    return collector.favoritePerformers.map(e => e.name);
  }

  onSelectedCollector(collector: Collector): void {
    this.collectorService.getCollectorDetail(collector.id).subscribe(
      (collectorDetail) => {
        this.selectedCollector = collectorDetail;
        this.selected = true;
      })
    this.router.navigate(['collectors',collector.id])
  }

  unselectCollector(selected: boolean){
    this.selected = selected;
  }

  ngOnInit(): void {
    this.getCollectors();
  }
}
