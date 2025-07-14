import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city.component';
import { CityCreateEditComponent } from './components/city-create-edit/city-create-edit.component';
import { CityService } from './services/city.service';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CityComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CityComponent,
    CityCreateEditComponent
  ],
  providers: [
    CityService
  ]
})
export class CityModule { } 