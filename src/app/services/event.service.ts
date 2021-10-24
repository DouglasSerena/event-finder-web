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
    }) as any;
  }

  save(data: any, id?: string): Observable<IHttpResponse<IEvent[]>> {
    if (id) {
      return this.httpService.put(`/event/${id}`, data, id) as any;
    }
    return this.httpService.post(`/event`, data) as any;
  }

  delete(eventId: string): Observable<IHttpResponse<void>> {
    return this.httpService.delete(`/event`, eventId) as any;
  }

  getMy(): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get(
      `/event/user/${this.authJwtService.tokenDecode.id}`
    ) as any;
  }

  getByLocation(
    latitude: number,
    longitude: number
  ): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get(
      `/event/location/${latitude}/${longitude}`
    ) as any;
  }

  getAll(): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get('/event') as any;
  }

  getById(id: string): Observable<IHttpResponse<IEvent>> {
    return this.httpService.get('/event', id) as any;
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
