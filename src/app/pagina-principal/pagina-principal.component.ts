import { Component, OnInit } from '@angular/core';
import { Album } from '../album/album';
import { AlbumService } from '../album/album.service';
import { AlbumDetail } from '../album/albumdetail';
import { CollectorDetail } from '../collector/collector-detail';
import { CollectorService } from '../collector/collector.service';
import { Musician } from '../musician/musician';
import { MusicianService } from '../musician/musician.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
})
export class PaginaPrincipalComponent implements OnInit {
  albumes: AlbumDetail[];
  musicos: Musician[];
  coleccionistas: CollectorDetail[];

  constructor(
    private albumesService: AlbumService,
    private musicianService: MusicianService,
    private collectoresService: CollectorService
  ) {}

  ngOnInit(): void {
    this.albumesService.getAlbums().subscribe((albumes) => {
      this.albumes = albumes;
    });

    this.musicianService.getMusicians().subscribe((musicians) => {
      this.musicos = musicians;
    });

    this.collectoresService.getCollectors().subscribe((collectors) => {
      this.coleccionistas = collectors;
    });
  }
}
