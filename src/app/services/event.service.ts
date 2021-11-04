import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthJwtService, HttpService } from '@douglas-serena/ng-utils';
import { base64toFile, handleTry } from '@douglas-serena/utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { IHttpResponse } from '../interfaces/http-response.interface';
import { FEATURE_KEY_CATEGORY } from '../stores/category/category.reducer';
import { ICategory } from '../stores/category/interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public categories: ICategory[] = [];

  public get categoriesId() {
    return this.categories.reduce((categoriesId, category) => {
      if (category.select) {
        categoriesId.push(category._id);
      }
      return categoriesId;
    }, [] as string[]);
  }

  constructor(
    private httpService: HttpService,
    private authJwtService: AuthJwtService,
    private store: Store<{ [FEATURE_KEY_CATEGORY]: ICategory[] }>
  ) {
    store.select('category').subscribe((categories) => {
      this.categories = categories;
    });
  }

  public search(text: string): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get('/event/search', {
      params: {
        query: text,
        categoriesId: this.categoriesId.join(','),
      },
    }) as any;
  }

  public save(data: any, id?: string): Observable<IHttpResponse<IEvent[]>> {
    if (id) {
      return this.httpService.put(`/event/${id}`, data, id) as any;
    }
    return this.httpService.post(`/event`, data) as any;
  }

  public delete(eventId: string): Observable<IHttpResponse<void>> {
    return this.httpService.delete(`/event`, eventId) as any;
  }

  public getMy(): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get(
      `/event/user/${this.authJwtService.tokenDecode.id}`
    ) as any;
  }

  public getByLocation(
    latitude: number,
    longitude: number
  ): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get(`/event/location`, {
      params: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        categoriesId: this.categoriesId.join(','),
      },
    }) as any;
  }

  public getAll(): Observable<IHttpResponse<IEvent[]>> {
    return this.httpService.get('/event') as any;
  }

  public getById(id: string): Observable<IHttpResponse<IEvent>> {
    return this.httpService.get('/event', id) as any;
  }

  public async upload(
    images: string[]
  ): Promise<IHttpResponse<{ url: string }[]>> {
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
