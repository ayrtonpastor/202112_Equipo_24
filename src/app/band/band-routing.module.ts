import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandListComponent } from './band-list/band-list.component';
import { BandDetailComponent } from './band-detail/band-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BandListComponent
  },
  {
    path: ':id',
    component: BandDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandRoutingModule { }


