import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MvEmployee, MvAddEmployee } from './employee.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { UtilityService } from 'src/core/services/utility.service';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvEmployee>;
  selectedEmployee: MvAddEmployee = <MvAddEmployee>{};
  errorMessage = '';
  selection = new SelectionModel<MvEmployee>(false, []);

  constructor(private employeeService: EmployeeService,
    private dialog: MatDialog,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.displayedColumns = ['employeeId', 'firstName', 'middleName', 'surname', 'city', 'email', 'phone'/*, 'insertPersonId'*/];
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployeeDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvEmployee>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvEmployee>();
        this.errorMessage = 'No Employees';
      }
    });
  }

  Add() {
    this.selection.clear();
    this.selectedEmployee = <MvEmployee>{};
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
    dialogConfig.data = {data: this.selectedEmployee, action: action};
    const dialogRef = this.dialog.open(EmployeeFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit') {
          this.employeeService.editEmployee(result).subscribe(res => {
            this.utilityService.openSnackBar('Edit Successful', 'success');
            this.getAllEmployee();
          });

        } else {
          this.employeeService.addEmployee(result).subscribe(res => {
            this.utilityService.openSnackBar('Add successful', 'success');
            this.getAllEmployee();
          });
        }
      }

    });
  }
  selectRow(e: any, row: MvEmployee){
    this.selectedEmployee = {...row};
    this.selection.toggle(row);
  }

}

