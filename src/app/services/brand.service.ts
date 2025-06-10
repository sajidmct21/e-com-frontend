import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../interfaces/brand.interface';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Apiresponse } from '../interfaces/apiresponse.interface';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  http = inject(HttpClient);
  constructor() {}

  httpCreateBrand(dataModel:Brand){
    // console.log(name);
    return this.http.post(`${environment.apiUrl}/api/brand/createBrand`,dataModel)
  }

  httpGetAllBrands():Observable<Apiresponse<Brand[]>> {
    return this.http.get<Apiresponse<Brand[]>>(`${environment.apiUrl}/api/brand/getAllBrands`);
  }

  httpGetBrandById(id:string):Observable<Apiresponse<Brand>>{
    return this.http.get<Apiresponse<Brand>>(`${environment.apiUrl}/api/brand/getBrandById/${id}`)
  }

   httpUpdateBrand(id:string,dataModel:Brand){
    return this.http.put(`${environment.apiUrl}/api/brand/updateBrand/${id}`, dataModel)
  }

   httpDeleteBrand(id:string){
    return this.http.delete(`${environment.apiUrl}/api/brand/deleteBrand/${id}`)
  }
}
