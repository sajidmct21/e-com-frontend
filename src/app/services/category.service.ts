import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apiresponse } from '../interfaces/apiresponse.interface';
import { Category } from '../interfaces/category.interface';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  constructor() {}

  httpGetAllCategories():Observable<Apiresponse<Category[]>> {
    return this.http.get<Apiresponse<Category[]>>('http://localhost:3000/api/category/getAllCategories');
  }
}
