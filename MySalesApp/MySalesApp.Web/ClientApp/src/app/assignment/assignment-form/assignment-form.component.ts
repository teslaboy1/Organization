import { UtilityService } from 'src/core/services/utility.service';
import { MvAddAssignment } from './../assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit, AfterViewInit {

  assignmentForm: FormGroup;
  action: string;
  // tslint:disable-next-line: radix
  // userId = parseInt(localStorage.getItem('userId'));
  selectedAssignment: MvAddAssignment = <MvAddAssignment>{};

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssignmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService) {
      this.action = data.action;
      this.selectedAssignment = data.data || {};
    }

  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      employeeId: ['', Validators.required],
      jobId: ['', Validators.required],
      status: ['', Validators.required],
      insertPersonId: ['', Validators.required] // [ this.userId ]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedAssignment);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.assignmentForm.updateValueAndValidity();
  }

}
