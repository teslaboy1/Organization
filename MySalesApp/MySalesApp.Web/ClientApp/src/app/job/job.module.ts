import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './../shared/material.module';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from './job-form/job-form.component';
import { JobComponent } from './job.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: JobComponent}
];


@NgModule({
  declarations: [
    JobComponent,
    JobFormComponent
  ],
  entryComponents: [JobFormComponent],
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
    JobComponent
  ],
  providers: [
    JobComponent
  ]
})
export class JobModule { }
