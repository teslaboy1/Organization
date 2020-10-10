import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MvEmployee, MvAddEmployee } from './employee.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/core/services/utility.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvEmployee>;
  errorMessage = '';
  selectedEmployee: MvAddEmployee = <MvAddEmployee>{};
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
        this.errorMessage = 'No data';
      }
    });
  }

  onAdd() {
    this.selection.clear();
    this.selectedEmployee = <MvEmployee>{};
    this.openDialog('Add');
  }
  onEdit() {
    this.openDialog('Edit');
  }

  openDialog(action: string) {
    if (action === 'Edit' && !this.selection.hasValue()){
      this.utilityService.openSnackBar('Please Select Row first', 'warn');
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
            this.utilityService.openSnackBar('Employee Edited', 'success');
            this.getAllEmployee();
          });

        } else {
          this.employeeService.addEmployee(result).subscribe(res => {
            this.utilityService.openSnackBar('Employee added successfully', 'success');
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

