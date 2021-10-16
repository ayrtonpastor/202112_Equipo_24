import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component'
import { AlbumCreateComponent } from "./album-create/album-create.component";
import { CommentCreatorComponent } from '../comment/comment-creator/comment-creator.component';
import { AlbumTrackCreateComponent } from "./album-track-create/album-track-create.component";


@NgModule({
  declarations: [AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, CommentCreatorComponent, AlbumTrackCreateComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [AlbumListComponent, AlbumDetailComponent, AlbumCreateComponent, CommentCreatorComponent, AlbumTrackCreateComponent]
})
export class AlbumModule { }
