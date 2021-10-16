import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CollectorDetail } from './collector-detail';
import { forkJoin, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from 'src/environments/environment';
import { Album } from '../album/album';
import { CollectorAlbum } from '../collectoralbum/collectoralbum';
import { Musician } from '../musician/musician';
import { ALBUM_STATUS } from '../albumstatus/albumstatus.enum';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {
  private apiUrl: string = environment.baseUrl + 'collectors';
  constructor(private httpClient: HttpClient) { }

  getCollectors(): Observable<CollectorDetail[]> {
    return this.httpClient.get<CollectorDetail[]>(this.apiUrl);
  }

  getCollectorAlbums(collector_id: number): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.apiUrl + '/' + collector_id + '/albums');
  }

  createCollectorAlbum(collector_id: number, album_id: number, price: number, status: ALBUM_STATUS): Observable<CollectorAlbum> {
    let data = {
      "price": price,
      "status": status
    }
    const url = this.apiUrl + '/' + collector_id + '/albums/' + album_id
    return this.httpClient.post<CollectorAlbum>(url , data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getCollectorDetail(collector_id: number): Observable<CollectorDetail> {
    return forkJoin(
      [
        this.httpClient.get<CollectorDetail[]>(this.apiUrl + '/' + collector_id),
        this.getCollectorAlbums(collector_id)
      ]).pipe(
        map(
          (data: any[]) => {
            let collector: CollectorDetail = data[0];
            let albums: CollectorAlbum[] = data[1];
            collector.collectorAlbums = albums;
            return collector;
          })
      );
  }

  addFavoriteMusician(collector_id: number, musician_id: number): Observable<Musician> {
    const url = this.apiUrl + '/' + collector_id + '/musicians/' + musician_id;
    return this.httpClient.post<Musician>(url , null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
