import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from "./album-detail/album-detail.component";

const routes: Routes = [
  {
    path: 'albums',
    children: [
      {
        path: 'list',
        component: AlbumListComponent
      },
      {
        path: ':id',
        component: AlbumDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
