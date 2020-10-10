import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class WebApiService {
    apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {

    }

    post(url: string, body: any): Observable<any> {
        return this.httpClient.post(this.apiUrl + url, body, { headers: this.getHeaderOptions() });
    }


    get(url: string, params?: any): Observable<any> {
        return this.httpClient.get(this.apiUrl + url, { headers: this.getHeaderOptions(), params: { json: params }});
    }


    getHeaderOptions(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, POST');
        headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type');

        return headers;


    }

}