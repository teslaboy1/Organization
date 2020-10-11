import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MvJob, MvAddJob } from './job.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { JobFormComponent } from './job-form/job-form.component';
import { UtilityService } from 'src/core/services/utility.service';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvJob>;
  selectedJob: MvAddJob = <MvAddJob>{};
  errorMessage = '';
  selection = new SelectionModel<MvJob>(false, []);

  constructor(private jobService: JobService,
    private dialog: MatDialog,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.displayedColumns = ['jobId', 'jobDescription', 'organizationName'];
    this.getAllJob();
  }

  getAllJob() {
    this.jobService.getAllJobDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvJob>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvJob>();
        this.errorMessage = 'No Jobs';
      }
    });
  }

  Add() {
    this.selection.clear();
    this.selectedJob = <MvJob>{};
    this.openDialog('Add');
  }
  Edit() {
    this.openDialog('Edit');
  }

  openDialog(action: string) {
    if (action === 'Edit' && !this.selection.hasValue()) {
      this.utilityService.openSnackBar('Select any Row', 'warn');
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = {data: this.selectedJob, action: action};
    const dialogRef = this.dialog.open(JobFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit') {
          this.jobService.editJob(result).subscribe(res => {
            this.utilityService.openSnackBar('Edit Successful', 'success');
            this.getAllJob();
          });

        } else {
          this.jobService.addJob(result).subscribe(res => {
            this.utilityService.openSnackBar('Added Successful', 'success');
            this.getAllJob();
          });
        }
      }

    });
  }
  selectRow(e: any, row: MvJob){
    this.selectedJob = {...row};
    this.selection.toggle(row);
  }

}