import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BandDetail } from './band-detail';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  private apiUrl:string = environment.baseUrl + 'bands';
  constructor(private http: HttpClient) { }

  getBands(): Observable<BandDetail[]> {
    return this.http.get<BandDetail[]>(this.apiUrl);
  }

  getBandDetail(bandId): Observable<BandDetail> {
    console.log(bandId + " al observar");
    return this.http.get<BandDetail>(`${this.apiUrl}/${bandId}`);
  }
}
