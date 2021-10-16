import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Musician } from '../musician';
import { MusicianService } from '../musician.service';
import { Album } from "../../album/album";


@Component({
  selector: 'app-musician-detail',
  templateUrl: './musician-detail.component.html'
})
export class MusicianDetailComponent implements OnInit {
  @Input() musicianDetail: Musician;
  @Output() returnEvent = new EventEmitter<boolean>();
  musicianId: number;
  bandAssignMenu = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicianService: MusicianService
  ) {
  }

  getMusicianDetail() : void {

    this.musicianService.getMusicianDetail(this.musicianId).subscribe(musicianDetail => {
      this.musicianDetail = musicianDetail;
    });
  }

  ngOnInit(): void {
    if (this.musicianDetail === undefined){
      this.musicianId = +this.route.snapshot.paramMap.get('id');
      this.getMusicianDetail();
    } else {
      this.musicianId = this.musicianDetail.id;
    }
  }

  toggle(): void {
    this.returnEvent.emit(false);
  }

  onSelectedAlbum(album :Album): void {
    this.router.navigateByUrl('/albums/' + album.id);
  }

  activateBandAssign(activate: boolean): void {
    if(!activate) {
      this.getMusicianDetail();
    }
    this.bandAssignMenu = activate;
  }

}
