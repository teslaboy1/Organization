import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
}
)
export class AssignmentService {

    constructor(private api: WebApiService) {}

    getAllAssignmentDetail() {
        return this.api.get('assignment/allassignmentdetail');
    }

    addAssignment(json): Observable<any> {
        return this.api.post('assignment/addassignment', json);
    }

    editAssignment(json): Observable<any> {
        return this.api.post('assignment/editassignment', json);
    }

}