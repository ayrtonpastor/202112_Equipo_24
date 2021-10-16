import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';

const routes: Routes = [
  {
    path: 'albums',
    loadChildren: () => import('./album/album.module').then((m) => m.AlbumModule)
  },
  {
    path: 'collectors',
    loadChildren: () => import('./collector/collector.module').then((m) => m.CollectorModule)
  },
  {
    path: 'musicians',
    loadChildren: () => import('./musician/musician.module').then((m) => m.MusicianModule)
  },
  {
    path: 'bands',
    loadChildren: () => import('./band/band.module').then((m) => m.BandModule)
  },
  {
    path: '',
    component: PaginaPrincipalComponent
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
