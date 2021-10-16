import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlbumService } from 'src/app/album/album.service';
import { AlbumDetail } from 'src/app/album/albumdetail';
import { ALBUM_STATUS } from 'src/app/albumstatus/albumstatus.enum';
import { CollectorAlbum } from 'src/app/collectoralbum/collectoralbum';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-album-create',
  templateUrl: './collector-album-create.component.html',
})
export class CollectorAlbumCreateComponent implements OnInit {
  @Input() collectorId: number;
  albums: AlbumDetail[];
  albums_statuses: any[] = []
  collectorAlbumForm: FormGroup;
  album_trad = {
    "ACTIVE" : { "name" : "Activo", "value" : "Active"},
    "INACTIVE" : {"name" : "Inactivo", "value" : "Inactive"}
  }
  @Output() returnEvent = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private albumService: AlbumService,
    private collectorService: CollectorService
  ) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe((albums) => {
      this.albums = albums;
    });

    for(let value in ALBUM_STATUS){
      this.albums_statuses.push({
        "value" : this.album_trad[value]['value'],
        "name" : this.album_trad[value]['name']
      });
    }

    this.collectorAlbumForm = this.formBuilder.group({
      album: ['', Validators.required],
      status: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.1)] ]
    });
  }

  createCollectorAlbum(collectorAlbum: any) {
    // Process checkout data here
    this.showSuccess(collectorAlbum);
    console.log(collectorAlbum)
    this.collectorService.createCollectorAlbum(this.collectorId, collectorAlbum.album,
      collectorAlbum.price, collectorAlbum.status).subscribe(
        response => { console.log(response); this.emitReturnEvent(); }
      )
    this.collectorAlbumForm.reset();
  }

  showSuccess(c: any) {
    this.toastr.success('Creado exitosamente!', `Album`, { "progressBar": true, timeOut: 4000 });
  }

  cancelCreation() {
    console.log("Cancelando ...");
    this.collectorAlbumForm.reset();
    this.emitReturnEvent();
  }

  emitReturnEvent(){
    this.returnEvent.emit(false);
  }
}
