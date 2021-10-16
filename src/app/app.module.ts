import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorResponseService } from './interceptors/http-error-response.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicianModule } from './musician/musician.module';
import { CollectorModule } from './collector/collector.module';
import { AlbumModule } from './album/album.module';
import { BandModule } from './band/band.module';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    AppRoutingModule,
    MusicianModule,
    BandModule,
    HttpClientModule,
    CollectorModule,
    AlbumModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorResponseService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
