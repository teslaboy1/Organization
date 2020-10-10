import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
}
)
export class EmployeeService {

    constructor(private api: WebApiService) {}

    getAllEmployeeDetail() {
        return this.api.get('employee/allemployeedetail');
    }

    addEmployee(json): Observable<any> {
        return this.api.post('employee/addemployee', json);
    }

    editEmployee(json): Observable<any> {
        return this.api.post('employee/editemployee', json);
    }

}
