import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleBoxService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPeopleBoxListAsync() {
    return this.httpClient.get('https://localhost:5001/messenger/people-box');
  }
}
