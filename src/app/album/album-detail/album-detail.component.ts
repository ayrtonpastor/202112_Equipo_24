import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlbumDetail } from '../albumdetail';
import { AlbumService } from '../album.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html'
})

export class AlbumDetailComponent implements OnInit {
  @Input() albumDetail: AlbumDetail;
  addCommentSelected = false;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {
  }

  albumId : number;

  getAlbumDetail() : void {
    this.albumService.getAlbumDetail(this.albumId).subscribe(albumDetail => {
      this.albumDetail = albumDetail;
    });
  }

  ngOnInit() {
    if (this.albumDetail === undefined) {
      this.albumId = +this.route.snapshot.paramMap.get('id');
      this.getAlbumDetail();
    }
  }

  activateAddComment(activate: boolean): void {
    this.addCommentSelected = activate;
  }
}
