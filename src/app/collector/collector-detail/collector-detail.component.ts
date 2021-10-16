import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectorDetail } from '../collector-detail';
import { CollectorService } from '../collector.service';

import { AlbumService } from "../../album/album.service";
import { Album } from 'src/app/album/album';
import { getLocaleNumberSymbol } from '@angular/common';

@Component({
  selector: 'app-collector-detail',
  templateUrl: './collector-detail.component.html'
})
export class CollectorDetailComponent implements OnInit {

  @Input() collectorDetail: CollectorDetail;
  @Output() returnEvent = new EventEmitter<boolean>();
  createAlbumSelected = false;
  createFavMusician = false;
  collectorId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectorService: CollectorService
  ) {
   }

  ngOnInit(): void {

    if (this.collectorDetail === undefined) {
      this.collectorId = +this.route.snapshot.paramMap.get('id');
      this.getCollectorDetail();
    } else {
      this.collectorId = this.collectorDetail.id;
    }
  }

  toggle(): void {
    this.returnEvent.emit(false);
  }

  getCollectorDetail(): void {
    this.collectorService.getCollectorDetail(this.collectorId)
      .subscribe(collectorDetail => {
        this.collectorDetail = collectorDetail;
        console.log(collectorDetail);
      });
  }

  onSelectedAlbum(album :Album): void {
    this.router.navigate(['albums', album.id]);
  }

  activateAlbumCreation(activate: boolean): void {
    if(!activate) {
      this.getCollectorDetail();
    }
    this.createAlbumSelected = activate;
  }

  activateFavMusicianCreation(activate: boolean): void {
    if(!activate) {
      this.getCollectorDetail();
    }
    this.createFavMusician = activate;
  }

}
