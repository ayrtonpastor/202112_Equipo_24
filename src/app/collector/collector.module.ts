import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorRoutingModule } from './collector-routing.module';
import { CollectorDetailComponent } from './collector-detail/collector-detail.component';
import { FavoriteMusicianCreatorComponent } from './favorite-musician-creator/favorite-musician-creator.component';
import { CollectorAlbumCreateComponent } from './collector-album-create/collector-album-create.component';


@NgModule({
  declarations: [CollectorListComponent, CollectorDetailComponent, FavoriteMusicianCreatorComponent, CollectorAlbumCreateComponent],
  imports: [
    CommonModule,
    CollectorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [CollectorListComponent, FavoriteMusicianCreatorComponent, CollectorAlbumCreateComponent]
})
export class CollectorModule { }
