import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  size: number;
  total: number;
  items: any[];
  previous_page?: string;
  next_page?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductImages(page = 1): Observable<any> {

    const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzliMWJlN2ViMzhjNGY2Zjg5Zjc3NTI1NmNkNDY5ZTMiLCJleHAiOjE3MjAyNDgwNzh9.TJdJSAitrbgTGYMiCIfziuPfXp72ciRvABUY0sUE-fM'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`
    });
    const url = `${environment.baseUrl}?page=${page}&organization_id=${environment.organization_id}&api_key=${environment.ApiKey}`;
    return this.http.get<any>(url,{headers: headers });
  }
  
  getProductDetails(id: string): Observable<any> {
    const url = `${environment.baseUrl}/products?organization_id=${environment.organization_id}`;
    return this.http.get<any>(url);
  }
}
