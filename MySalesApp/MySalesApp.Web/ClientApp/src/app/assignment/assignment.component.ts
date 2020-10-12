import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MvAssignment, MvAddAssignment } from './assignment.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { UtilityService } from 'src/core/services/utility.service';
import { AssignmentService } from './assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvAssignment>;
  selectedAssignment: MvAddAssignment = <MvAddAssignment>{};
  errorMessage = '';
  selection = new SelectionModel<MvAssignment>(false, []);

  constructor(private assignmentService: AssignmentService,
    private dialog: MatDialog,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.displayedColumns = ['assignmentId', 'organizationName', 'firstName', 'middleName', 'surname'/*, 'insertPersonId'*/];
    this.getAllAssignment();
  }

  getAllAssignment() {
    this.assignmentService.getAllAssignmentDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvAssignment>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvAssignment>();
        this.errorMessage = 'No Assignments Currently';
      }
    });
  }

  Add() {
    this.selection.clear();
    this.selectedAssignment = <MvAssignment>{};
    this.openDialog('Add');
  }
  Edit() {
    this.openDialog('Edit');
  }

  openDialog(action: string) {
    if (action === 'Edit' && !this.selection.hasValue()){
      this.utilityService.openSnackBar('Select any Row', 'warn');
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = {data: this.selectedAssignment, action: action};
    const dialogRef = this.dialog.open(AssignmentFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit') {
          this.assignmentService.editAssignment(result).subscribe(res => {
            this.utilityService.openSnackBar('Edit Successful', 'success');
            this.getAllAssignment();
          });

        } else {
          this.assignmentService.addAssignment(result).subscribe(res => {
            this.utilityService.openSnackBar('Add successful', 'success');
            this.getAllAssignment();
          });
        }
      }

    });
  }
  selectRow(e: any, row: MvAssignment){
    this.selectedAssignment = {...row};
    this.selection.toggle(row);
  }

}