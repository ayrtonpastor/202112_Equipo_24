import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from './album';
import { AlbumDetail } from "../album/albumdetail";
import { Track } from '../track/track';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl: string = environment.baseUrl + 'albums';
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Array<AlbumDetail>> {
    return this.http.get<Array<AlbumDetail>>(this.apiUrl);
  }

  getAlbumDetail(AlbumId): Observable<AlbumDetail> {
    console.log(AlbumId);
    return this.http.get<AlbumDetail>(`${this.apiUrl}/${AlbumId}`);
  }

  addNewAlbum(newAlbum: Album): Observable<any> {
    console.log(newAlbum);
    return this.http.post<any>(`${this.apiUrl}`, newAlbum);
  }

  addNewTrack(newTrack: Track): Observable<any> {
    console.log(newTrack);
    return this.http.post<any>(this.apiUrl + '/' + newTrack.id + '/tracks', { name: newTrack.name, duration: newTrack.duration });
  }

}
