import { Component, OnInit } from '@angular/core';
import { AlbumDetail } from '../albumdetail';
import { AlbumService } from '../album.service';
import { AlbumCreateComponent } from "../album-create/album-create.component";
import { AlbumTrackCreateComponent } from "../album-track-create/album-track-create.component";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  public albums: AlbumDetail[];
  selectedAlbum: AlbumDetail;
  selected = false;
  activateAlbumCreation = false;
  activateTrackCreation = false;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe(albums => this.albums = albums);
  }

  createNewAlbum(activate: boolean): void {
    this.activateAlbumCreation = activate;
    this.selected = !activate;
    this.activateTrackCreation = false;
  }

  createNewTrack(activate: boolean): void {
    this.activateTrackCreation = activate;
    this.selected = !activate;
    this.activateAlbumCreation = false;
  }

  onSelectedAlbum(a: AlbumDetail): void {
    this.albumService.getAlbumDetail(a.id)
      .subscribe(album => {
        if (album !== null) {
          this.selectedAlbum = album;
          this.selected = true;
          this.activateAlbumCreation = false;
        }
      });
  }

}
