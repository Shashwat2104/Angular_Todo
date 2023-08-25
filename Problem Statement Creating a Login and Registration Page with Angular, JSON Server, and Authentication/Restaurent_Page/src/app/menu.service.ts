import { categories } from './menu-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}
  appurl = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  listMenu(): Observable<{ categories: categories[] }> {
    return this.http.get<{ categories: categories[] }>(this.appurl);
  }
  getCartData() {
    let arr: any = JSON.parse(localStorage.getItem('cart') || '[]');
    return arr;
  }
}
