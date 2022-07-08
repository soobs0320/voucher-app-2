import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pageable } from 'src/interfaces/erp';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErpService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  getList<T>(documentType: string, filter?) {
    const url = `${environment.apiUrl}/${environment.companyCode}/docs/${documentType}`;
    return this.http.get<Pageable<T>>(url, { params: filter }).toPromise();
  }

  getOne<T>(documentType: string, id: number) {
    const url = `${environment.apiUrl}/${environment.companyCode}/module/${documentType}/${id}`;
    return this.http.get<T>(url).toPromise();
  }

  update(documentType: string, id: number, payload: { [key: string]: any }) {
    const url = `${environment.apiUrl}/${environment.companyCode}/docs/${documentType}/${id}`;
    return this.http.post<any>(url, payload).toPromise();
  }

  login(payload: { [key: string]: any }) {
    const url = `${environment.apiUrl}/${environment.companyCode}/login`;
    return this.http
      .post<any>(url, payload, { observe: 'response' })
      .toPromise();
  }

  logout() {
    this.storageService.remove('token');
    this.storageService.remove('refreshToken');
    this.storageService.remove('userId');
    this.router.navigate(['/login']);
  }

  public async getRefreshToken() {
    const refreshToken = await this.storageService.get('refreshToken');
    let headers = { headers: { Authorization: 'Bearer ' + refreshToken } };
    let requestURL =
      environment.apiUrl +
      '/' +
      environment.companyCode +
      '/refresh_refresh_token';
    return this.http.get<any>(requestURL, headers).pipe().toPromise();
  }
}
