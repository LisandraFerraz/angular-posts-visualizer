import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCoreService {
  constructor(private http: HttpClient) {}

  public get(url: string, options?: {}): Observable<any> {
    return this.http.get(url, options);
  }

  public delete(url: string, options?: {}): Observable<any> {
    return this.http.delete(url, options);
  }

  public post(url: string, options?: {}): Observable<any> {
    return this.http.post(url, options);
  }

  public put(url: string, options?: {}): Observable<any> {
    return this.http.put(url, options);
  }
}
