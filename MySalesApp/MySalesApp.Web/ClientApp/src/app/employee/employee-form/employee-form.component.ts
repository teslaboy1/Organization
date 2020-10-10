import { UtilityService } from 'src/core/services/utility.service';
import { MvAddEmployee } from './../employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit, AfterViewInit {

  employeeForm: FormGroup;
  action: string;
  // tslint:disable-next-line: radix
  // userId = parseInt(localStorage.getItem('userId'));
  selectedEmployee: MvAddEmployee = <MvAddEmployee>{};

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService) {
      this.action = data.action;
      this.selectedEmployee = data.data || {};
    }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: '',
      surname: ['', Validators.required],
      city: ['', Validators.required],
      email: '',
      phone: ['',
       [Validators.required,
        Validators.pattern('[0-9]*')]],
      insertPersonId: ['', Validators.required] // [ this.userId ]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedEmployee);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.employeeForm.updateValueAndValidity();
  }

}
