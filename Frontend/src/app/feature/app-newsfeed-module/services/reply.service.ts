import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryService } from '../../../core/services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class ReplyService extends RepositoryService {

  constructor(
    http: HttpClient
  ) {
    super(http);

    this.endpoint = 'replies';
    this.url += this.endpoint;
  }
}
