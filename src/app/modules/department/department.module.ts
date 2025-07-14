import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './components/department.component';
import { DepartmentCreateEditComponent } from './components/department-create-edit/department-create-edit.component';
import { DepartmentService } from './services/department.service';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    DepartmentComponent,
    DepartmentCreateEditComponent
  ],
  providers: [
    DepartmentService
  ]
})
export class DepartmentModule { } 