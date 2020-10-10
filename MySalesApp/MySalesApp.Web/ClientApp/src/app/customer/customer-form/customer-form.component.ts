import { UtilityService } from 'src/core/services/utility.service';
import { MvAddCustomer } from './../customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit, AfterViewInit {

  customerForm: FormGroup;
  action: string;
  // tslint:disable-next-line: radix
  // userId = parseInt(localStorage.getItem('userId'));
  selectedCustomer: MvAddCustomer = <MvAddCustomer>{};

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService) {
      this.action = data.action;
      this.selectedCustomer = data.data || {};
    }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      organizationName: ['', Validators.required],
      city: ['', Validators.required],
      email: '',
      phone: ['',
       [Validators.required,
        Validators.pattern('[0-9]*')]],
      insertPersonId: ['', Validators.required] // [ this.userId ]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedCustomer);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.customerForm.updateValueAndValidity();
  }

}
