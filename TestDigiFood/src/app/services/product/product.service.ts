import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  apiKey : string = '4d4d1be115036f2ff30976ac4758e9d8';
  url : string = 'http://plateform.kamss-developers.com/api/' + this.apiKey + '/';
  
  constructor(public http : Http) {}

  /*
  |--------------------
  | getCategories
  |-------------------
  | return all categories for products
  |
  */
  getCategories()
  {
    return this.http.get(this.url + 'products/categories')
                    .map(res => res.json() );
  }

  /*
  |--------------------
  | getProductsByCatgory
  |-------------------
  | return all products by category
  |
  */
  getProductsByCatgory(cat)
  {
    return this.http.get(this.url + 'products/category/' + cat)
                    .map(res => res.json());
  }

  /*
  |--------------------
  | getProduct
  |-------------------
  | return product by id
  |
  */
  getProduct(id)
  {
      return this.http.get(this.url + 'product/' + id)
                      .map(res => res.json());
  }

  


}
