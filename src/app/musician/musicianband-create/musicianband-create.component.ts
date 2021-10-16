import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MusicianService } from '../musician.service';
import { Band } from "../../band/band"

@Component({
  selector: 'app-musicianband-create',
  templateUrl: './musicianband-create.component.html',
})
export class MusicianbandCreateComponent implements OnInit {
  @Input() musicianId: number;
  @Output() returnEvent = new EventEmitter<boolean>();
  musicianBandForm: FormGroup;
  bandas: Band[]

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private musicianService: MusicianService
  ) {}

  ngOnInit(): void {
    this.musicianService.getBandas().subscribe((bandas) => {
      this.bandas = bandas;
    })
    this.musicianBandForm = this.formBuilder.group({
      band: ['', Validators.required]
    });

  }

  createMusicianBand(bandObject: any) {
    this.showSuccess(bandObject);
    this.musicianService.addMusicianToBand(this.musicianId, bandObject.band ).subscribe(
      response => { console.log(response); this.emitReturnEvent(); }
    )

  }

  showSuccess(c: any) {
    this.toastr.success('Creado exitosamente!', `Musico`, {
      progressBar: true,
      timeOut: 4000,
    });
  }

  cancelCreation() {
    console.log('Cancelando ...');
    this.musicianBandForm.reset();
    this.emitReturnEvent();
  }

  emitReturnEvent() {
    this.returnEvent.emit(false);
  }
}
