import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { BandRoutingModule } from './band-routing.module';


@NgModule({
  imports: [
    CommonModule,
    BandRoutingModule
  ],
  declarations: [BandListComponent, BandDetailComponent],
  exports: [BandListComponent],
})
export class BandModule { }
