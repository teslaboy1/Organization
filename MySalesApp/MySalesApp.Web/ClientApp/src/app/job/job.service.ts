import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
}
)
export class JobService {

    constructor(private api: WebApiService) {}

    getAllJobDetail() {
        return this.api.get('job/alljobdetail');
    }

    addJob(json): Observable<any> {
        return this.api.post('job/addjob', json);
    }

    editJob(json): Observable<any> {
        return this.api.post('job/editjob', json);
    }

}