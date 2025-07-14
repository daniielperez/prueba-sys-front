import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsComponent } from './components/materials.component';
import { MaterialsCreateEditComponent } from './components/materials-create-edit/materials-create-edit.component';
import { MaterialService } from './services/material.service';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MaterialsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MaterialsComponent,
    MaterialsCreateEditComponent
  ],
  providers: [
    MaterialService
  ]
})
export class MaterialsModule { } 