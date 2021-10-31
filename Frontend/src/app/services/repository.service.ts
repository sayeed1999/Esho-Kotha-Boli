import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private all: any[] = [];
  protected url: string = 'https://localhost:44345/';
  protected endpoint: string = '';
  
  dataChanged = new Subject<boolean>();

  constructor(
    protected http: HttpClient,
  ) { }

  // CRUD

  public getAll(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public getById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}/${id}`
    );
  }

  public add(item: any): Observable<any> {
    return this.http.post<any>(
      this.url,
      item
    );
  }
  
  public update(id: number, item: any): Observable<any> {
    return this.http.put<any>(
      `${this.url}/${id}`,
      item
    );
  }
  
  public delete(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.url}/${id}`
    );
  }

}