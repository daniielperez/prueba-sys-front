import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/materials',
    pathMatch: 'full'
  },
  {
    path: 'materials',
    loadChildren: () => import('./modules/materials/materials.module').then(m => m.MaterialsModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./modules/city/city.module').then(m => m.CityModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: '/materials'
  }
];
