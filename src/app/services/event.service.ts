import { Injectable } from '@angular/core';
import { HttpService } from '@douglas-serena/ng-utils';
import { Observable } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { IHttpResponse } from '../interfaces/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private httpService: HttpService) {}

  search(
    text: string,
    categoriesId?: string[] | number[]
  ): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get('/event/search', {
      params: {
        query: text,
      },
    });
  }

  getAll(): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get('/event');
  }

  getById(id: string): Observable<IHttpResponse<IEvent>> {
    return this.httpService.get('/event', id);
  }
}
