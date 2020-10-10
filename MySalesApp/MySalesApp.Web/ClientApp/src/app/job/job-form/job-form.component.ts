import { UtilityService } from 'src/core/services/utility.service';
import { MvAddJob } from './../job.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit, AfterViewInit {

  jobForm: FormGroup;
  action: string;
  // tslint:disable-next-line: radix
  // userId = parseInt(localStorage.getItem('userId'));
  selectedJob: MvAddJob = <MvAddJob>{};

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilityService: UtilityService) {
      this.action = data.action;
      this.selectedJob = data.data || {};
    }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      organizationId: ['', Validators.required],
      jobDescription: '',
      insertPersonId: ['', Validators.required] // [ this.userId ]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.selectedJob);
  }
  onClose() {
    this.dialogRef.close();
    this.utilityService.openSnackBar('Operation Cancelled', 'warn');
  }

  ngAfterViewInit() {
    this.jobForm.updateValueAndValidity();
  }

}