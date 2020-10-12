import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentComponent } from './assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: AssignmentComponent}
];


@NgModule({
  declarations: [
    AssignmentComponent,
    AssignmentFormComponent
  ],
  entryComponents: [AssignmentFormComponent],
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
    AssignmentComponent
  ],
  providers: [
    AssignmentComponent
  ]
})
export class AssignmentModule {}
