import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedService } from './paginated.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient,
    private paginatedService: PaginatedService) {

  }

  addLike(username: string) {
    return this.http.post(environment.apiUrl + 'likes/' + username, {})
  }

  getLikes(predicate: string, pageNumer: number, pageSize: number) {

    let params = this.paginatedService.getPaginationHeaders(pageNumer, pageSize);
    params = params.append('predicate', predicate);

    return this.paginatedService.getPaginatedResult(environment.apiUrl + 'likes', params)

    //return this.http.get<Partial<Member[]>>(environment.apiUrl + 'likes?predicate=' + predicate);
  }
}
