import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { forkJoin, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { environment } from 'src/environments/environment';

import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public apiUrl: string = environment.baseUrl + 'albums';

  constructor(private httpClient: HttpClient) { }

  addComment(album_id: number, comment: Comment): Observable<Comment> {
    const url = this.apiUrl + '/' + album_id + '/comments';
    return this.httpClient.post<Comment>(url , comment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
