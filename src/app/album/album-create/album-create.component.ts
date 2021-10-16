import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Album } from '../album';
import { AlbumService } from "../album.service";
import { RECORD_LABEL } from 'src/app/recordlabel/recordlabel.enum';
import { GENRE } from "src/app/genre/genre.enum";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html'
})
export class AlbumCreateComponent implements OnInit {
  @Output() reloadAlbums: EventEmitter<void> = new EventEmitter<void>();

  albumForm: FormGroup;
  recordLabels: any[] = [];
  genres: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private albumService: AlbumService,
  ) { }

  createAlbum(newAlbum: Album) {
    this.albumService.addNewAlbum(newAlbum)
      .subscribe(response => {
        this.emitReturnEvent();
        this.reloadAlbums.emit();
        this.showSuccess(newAlbum);
      }, (error) => {
        this.showError(newAlbum, error);
      });
    this.albumForm.reset();
  }

  showSuccess(c: Album) {
    this.toastr.success('Creado exitosamente!', `Album ${c.name}`, { "progressBar": true, timeOut: 4000 });
  }

  showError(c: Album, error: HttpErrorResponse) {
    this.toastr.success('Error creando album!', `Album ${c.name} ${error.error.message}`, { "progressBar": true, timeOut: 4000 });
  }

  cancelCreation() {
    this.albumForm.reset();
    this.emitReturnEvent();
  }

  emitReturnEvent() {
    this.reloadAlbums.emit();
  }

  ngOnInit() {
    this.albumForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(1)]],
      cover: ["", [Validators.required, Validators.minLength(1)]],
      releaseDate: ["", [Validators.required]],
      description: ["", [Validators.required]],
      genre: ["", [Validators.required]],
      recordLabel: ["", [Validators.required]]
    })

    for (let item in RECORD_LABEL) {
      if (isNaN(Number(item))) {
        this.recordLabels.push({ text: item, value: RECORD_LABEL[item] });
      }
    }

    for (let item in GENRE) {
      if (isNaN(Number(item))) {
        this.genres.push({ text: item, value: GENRE[item] });
      }
    }

  }

}
