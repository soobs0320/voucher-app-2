import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pageable } from 'src/interfaces/erp';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ErpService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async getList<T>(documentType: string, filter?) {
    const token = await this.storageService.get('token');
    const headers = { Authorization: 'Bearer ' + token };

    const url = `${environment.apiUrl}/${environment.companyCode}/docs/${documentType}`;
    return this.http
      .get<Pageable<T>>(url, { params: filter, headers })
      .toPromise();
  }

  async getOne<T>(documentType: string, id: number) {
    const token = await this.storageService.get('token');
    const headers = { Authorization: 'Bearer ' + token };

    const url = `${environment.apiUrl}/${environment.companyCode}/module/${documentType}/${id}`;
    return this.http
      .get<T>(url, { headers })
      .pipe(map((res) => res[0]))
      .toPromise();
  }

  async update(
    documentType: string,
    id: number,
    payload: { [key: string]: any }
  ) {
    const token = await this.storageService.get('token');
    const headers = { Authorization: 'Bearer ' + token };

    const url = `${environment.apiUrl}/${environment.companyCode}/docs/${documentType}/${id}`;
    return this.http.post<any>(url, payload, { headers }).toPromise();
  }

  login(payload: { [key: string]: any }) {
    const url = `${environment.apiUrl}/${environment.companyCode}/login`;
    return this.http
      .post<any>(url, payload, { observe: 'response' })
      .toPromise();
  }

  public async getRefreshToken(refreshToken) {
    let headers = { headers: { Authorization: 'Bearer ' + refreshToken } };
    let requestURL =
      environment.apiUrl +
      '/' +
      environment.companyCode +
      '/refresh_refresh_token';
    return this.http.get<any>(requestURL, headers).pipe().toPromise();
  }

  public async getAccessToken(refreshToken) {
    let headers = { headers: { Authorization: 'Bearer ' + refreshToken } };
    let requestURL =
      environment.apiUrl + '/' + environment.companyCode + '/refresh_token';
    return this.http.get<any>(requestURL, headers).pipe().toPromise();
  }
}
