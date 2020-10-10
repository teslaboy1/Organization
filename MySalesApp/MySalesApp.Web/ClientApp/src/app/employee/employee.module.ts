import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeComponent } from './employee.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: EmployeeComponent}
];


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeFormComponent
  ],
  entryComponents: [EmployeeFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule
  ],
  exports: [
    EmployeeComponent
  ],
  providers: [
    EmployeeComponent
  ]
})
export class EmployeeModule { }
