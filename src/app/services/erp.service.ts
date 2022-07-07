import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pageable } from 'src/interfaces/erp';

@Injectable({
  providedIn: 'root',
})
export class ErpService {
  constructor(private http: HttpClient) {}

  public getList<T>(documentType: string) {
    const url = `${environment.apiUrl}/${environment.companyCode}/docs/${documentType}`;
    return this.http.get<Pageable<T>>(url).toPromise();
  }

  public getOne<T>(documentType: string, id: number) {
    const url = `${environment.apiUrl}/${environment.companyCode}/module/${documentType}/${id}`;
    return this.http.get<T>(url).toPromise();
  }

  public login(payload: { [key: string]: any }) {
    const url = `${environment.apiUrl}/${environment.companyCode}/login`;
    return this.http.post(url, payload).toPromise();
  }
}
