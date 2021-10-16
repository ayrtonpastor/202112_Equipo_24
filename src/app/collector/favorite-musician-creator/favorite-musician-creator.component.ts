import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { CollectorDetail } from '../collector-detail';
import { CollectorService } from '../collector.service';
import { Musician } from "../../musician/musician";
import { MusicianService } from '../../musician/musician.service';

@Component({
  selector: 'app-favorite-musician-creator',
  templateUrl: './favorite-musician-creator.component.html'
})
export class FavoriteMusicianCreatorComponent implements OnInit {
  favoriteMusicianForm: FormGroup;
  musicians: Musician[];
  @Input() collectorDetail: CollectorDetail;
  @Output() returnEvent = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private collectorService: CollectorService,
    private musicianService: MusicianService
  ) { }

  getMusicians(): void {
    this.musicianService.getMusicians().subscribe((musicians) => {
      this.musicians = musicians;
    });
  }

  ngOnInit() {
    this.getMusicians();

    this.favoriteMusicianForm = this.formBuilder.group({
      musician_id: ["", Validators.required]
    });
  }

  createFavoriteMusician(newFavoriteMusician: any) {
    let selectedMusician = this.musicians.filter(m => m.id == newFavoriteMusician.musician_id);
    let sameFavMusicians = [];

    if(selectedMusician.length > 0){
      sameFavMusicians = this.collectorDetail.favoritePerformers.filter(m => m.name.match(selectedMusician[0].name));
    }

    if(sameFavMusicians.length > 0){
      this.toastr.error('', `Ya está seleccionado como favorito`, { "progressBar": false, timeOut: 2500 });
    }else{
      this.collectorService.addFavoriteMusician(this.collectorDetail.id, newFavoriteMusician.musician_id)
      .subscribe(response => {this.emitReturnEvent();});
      this.showSuccess(newFavoriteMusician);
    }

    this.favoriteMusicianForm.reset();
  }

  showSuccess(newFavoriteMusician: Musician) {
    this.toastr.success('', `Se agregó un nuevo músico favorito`, { "progressBar": false, timeOut: 2500 });
  }

  cancelCreation() {
    console.log("Cancelando ...");
    this.favoriteMusicianForm.reset();
    this.emitReturnEvent();
  }

  emitReturnEvent(){
    this.returnEvent.emit(false);
  }
}
