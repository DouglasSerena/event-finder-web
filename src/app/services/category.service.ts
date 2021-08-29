import { Injectable } from '@angular/core';
import { HttpService } from '@douglas-serena/ng-utils';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { IHttpResponse } from '../interfaces/http-response.interface';
import { categories } from '../mocks/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  get(): Observable<IHttpResponse<ICategory[]>> {
    return of({ data: categories } as IHttpResponse);
  }
}
