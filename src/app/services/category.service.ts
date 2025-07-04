import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apiresponse } from '../interfaces/apiresponse.interface';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  constructor() {}

  httpCreateCategory(dataModel:Category){
    // console.log(name);
    return this.http.post(`${environment.apiUrl}/api/category/createCategory`,dataModel)
  }

  httpGetAllCategories():Observable<Apiresponse<Category[]>> {
    return this.http.get<Apiresponse<Category[]>>(`${environment.apiUrl}/api/category/getAllCategories`);
  }

  httpGetCategoryById(id:string):Observable<Apiresponse<Category>>{
    return this.http.get<Apiresponse<Category>>(`${environment.apiUrl}/api/category/getCategoryById/${id}`)
  }

   httpUpdateCategory(id:string,dataModel:Category){
    return this.http.put(`${environment.apiUrl}/api/category/updateCategory/${id}`, dataModel)
  }

   httpDeleteCategory(id:string){
    return this.http.delete(`${environment.apiUrl}/api/category/deleteCategory/${id}`)
  }

}
