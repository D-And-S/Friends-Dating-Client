import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginatedService {

  constructor(private http: HttpClient) { }

  public getPaginationHeaders(pageNumber: number, pageSize: number) {
    /*
      For Pagination
    */
    // httpParams will give us to serialize the parameter
    let params: any = new HttpParams()
    params = params.append('pageNumber', pageNumber?.toString());
    params = params.append('pageSize', pageSize?.toString());

    return params;
  }

  public getPaginatedResult<T>(url: any, params: any) {
    //{observe:'response', params} it will pass the parameter as query string
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response: any) => {
        //console.log('response', response)
        paginatedResult.result = response.body;

        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    )
  }
}
