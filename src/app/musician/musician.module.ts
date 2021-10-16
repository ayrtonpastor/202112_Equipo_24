import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicianbandCreateComponent } from './musicianband-create/musicianband-create.component'
import { MusicianListComponent } from './musician-list/musician-list.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';
import { MusicianRoutingModule } from './musician-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MusicianRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MusicianListComponent, MusicianDetailComponent, MusicianbandCreateComponent],
  exports: [MusicianListComponent],
})
export class MusicianModule { }
