import { Injectable } from '@angular/core';
import { contains } from '@douglas-serena/utils';
import { Observable, of } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { IHttpResponse } from '../interfaces/http-response.interface';
import { events } from '../mocks/events';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  search(
    text: string,
    categoriesId?: string[] | number[],
  ): Observable<IHttpResponse<IEvent[]>> {
    const _events = events.filter((event) => {
      const match = contains(event.name, text);
      if (categoriesId && match) {
        return (categoriesId as any).includes(event.category.id as any);
      }
      return match;
    });
    return of({ data: _events } as IHttpResponse);
  }

  get(): Observable<IHttpResponse<IEvent[]>> {
    return of({ data: events } as IHttpResponse);
  }
}
