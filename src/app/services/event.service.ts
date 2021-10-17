import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthJwtService, HttpService } from '@douglas-serena/ng-utils';
import { base64toFile, handleTry } from '@douglas-serena/utils';
import { Observable } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { IHttpResponse } from '../interfaces/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private httpService: HttpService,
    private authJwtService: AuthJwtService
  ) {}

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

  save(data: any, id?: string): Observable<IHttpResponse<IEvent[]>> {
    if (id) {
      return this.httpService.put(`/event/${id}`, data, id);
    }
    return this.httpService.post(`/event`, data);
  }

  delete(eventId: string): Observable<IHttpResponse<void>> {
    return this.httpService.delete(`/event`, eventId);
  }

  getMy(): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get(
      `/event/user/${this.authJwtService.tokenDecode.id}`
    );
  }

  getAll(): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get('/event');
  }

  getById(id: string): Observable<IHttpResponse<IEvent>> {
    return this.httpService.get('/event', id);
  }

  async upload(images: string[]): Promise<IHttpResponse<{ url: string }[]>> {
    const form = new FormData();

    for (const image of images) {
      form.append('files', base64toFile(image, 'image'));
    }

    const [data] = await handleTry<HttpResponse<any>>(
      this.httpService.upload('/upload/image', form, 'post')
    );
    return data?.body;
  }
}
