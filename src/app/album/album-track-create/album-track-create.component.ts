import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Album } from '../album';
import { AlbumService } from "../album.service";
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { GENRE } from "src/app/genre/genre.enum";
import { HttpErrorResponse } from '@angular/common/http';
import { Track } from 'src/app/track/track';
import { AlbumDetail } from '../albumdetail';


@Component({
  selector: 'app-album-track-create',
  templateUrl: './album-track-create.component.html'
})
export class AlbumTrackCreateComponent implements OnInit {
  @Output() reloadAlbums: EventEmitter<void> = new EventEmitter<void>();
  //@Input() albumId: number;
  trackForm: FormGroup;
  albums: AlbumDetail[];
  selected: Album;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private albumService: AlbumService,
  ) { }

  createTrack(newTrack: Track) {
    this.albumService.addNewTrack(newTrack)
      .subscribe(response => {
        this.emitReturnEvent();
        this.reloadAlbums.emit();
        this.showSuccess(newTrack);
      }, (error) => {
        this.showError(newTrack, error);
      });
    this.trackForm.reset();
    console.log(this.selected);
  }

  showSuccess(c: Track) {
    this.toastr.success('Creado exitosamente!', `Track ${c.name}`, { "progressBar": true, timeOut: 4000 });
  }

  showError(c: Track, error: HttpErrorResponse) {
    this.toastr.success('Error creando track!', `Track ${c.name} ${error.error.message}`, { "progressBar": true, timeOut: 4000 });
  }

  cancelCreation() {
    this.trackForm.reset();
    //this.emitReturnEvent();
  }

  emitReturnEvent() {
    this.reloadAlbums.emit();
  }

  ngOnInit() {
    this.albumService.getAlbums().subscribe((albums) => {
      this.albums = albums;
    });

    this.trackForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(1)]],
      duration: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(5), Validators.pattern("[0-5][0-9]:[0-5][0-9]")]],
      id: ["", [Validators.required]]
    })
  }
}
