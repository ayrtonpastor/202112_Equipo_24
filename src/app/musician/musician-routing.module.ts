import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicianListComponent } from './musician-list/musician-list.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MusicianListComponent
  },
  {
    path: ':id',
    component: MusicianDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicianRoutingModule { }


