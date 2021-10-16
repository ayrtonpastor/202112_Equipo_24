import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Musician } from './musician';
import { Band } from '../band/band';


@Injectable({
  providedIn: 'root'
})
export class MusicianService {
  private apiUrl:string = environment.baseUrl + 'musicians';
  constructor(private http: HttpClient) { }

  getMusicians(): Observable<Musician[]> {
    return this.http.get<Musician[]>(this.apiUrl);
  }

  getMusicianDetail(musicianId): Observable<Musician> {
    console.log(musicianId + " al observar");
    return this.http.get<Musician>(`${this.apiUrl}/${musicianId}`);

  }

  getBandas(): Observable<Band[]> {
    return this.http.get<Band[]>(`${environment.baseUrl}bands`)
  }

  addMusicianToBand(musicianId: number, bandId: number): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}bands/${bandId}/musicians/${musicianId}`,'',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
