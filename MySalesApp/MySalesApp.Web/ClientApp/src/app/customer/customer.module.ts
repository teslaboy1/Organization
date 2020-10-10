import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerComponent } from './customer.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: CustomerComponent}
];


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerFormComponent
  ],
  entryComponents: [CustomerFormComponent],
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
    CustomerComponent
  ],
  providers: [
    CustomerComponent
  ]
})
export class CustomerModule { }
