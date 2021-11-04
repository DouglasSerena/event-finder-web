import { Injectable } from '@angular/core';
import { HttpService } from '@douglas-serena/ng-utils';
import { Observable } from 'rxjs';
import { ICategory } from './interfaces/category.interface';
import { IHttpResponse } from '../../interfaces/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  get(): Observable<IHttpResponse<ICategory[]>> {
    return this.httpService.get('/category') as any;
  }
}
