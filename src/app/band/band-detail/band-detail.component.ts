import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandDetail } from '../band-detail';
import { BandService } from '../band.service';
import { Album } from "../../album/album";


@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html'
})
export class BandDetailComponent implements OnInit {
  @Input() bandDetail: BandDetail;
  @Output() returnEvent = new EventEmitter<boolean>();
  bandId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bandService: BandService
  ) {
  }

  getBandDetail() : void {

    this.bandService.getBandDetail(this.bandId).subscribe(bandDetail => {
      this.bandDetail = bandDetail;
    });
  }

  ngOnInit(): void {
    if (this.bandDetail === undefined){
      this.bandId = +this.route.snapshot.paramMap.get('id');
      this.getBandDetail();
    } else {
      this.bandId = this.bandDetail.id;
    }
  }

  toggle(): void {
    this.returnEvent.emit(false);
  }

  onSelectedAlbum(album :Album): void {
    this.router.navigateByUrl('/albums/' + album.id);
  }
}
