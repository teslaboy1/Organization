import { WebApiService } from 'src/core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
}
)
export class CustomerService {

    constructor(private api: WebApiService) {}

    getAllCustomerDetail() {
        return this.api.get('customer/allcustomerdetail');
    }

    addCustomer(json): Observable<any> {
        return this.api.post('customer/addcustomer', json);
    }

    editCustomer(json): Observable<any> {
        return this.api.post('customer/editcustomer', json);
    }

}
