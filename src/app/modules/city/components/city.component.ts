import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CityService} from '../services/city.service';
import {MatSort} from '@angular/material/sort';
import {DepartmentService} from '../../department/services/department.service';
import {Department} from '../../../shared/models/department';
import {CityCreateEditComponent} from './city-create-edit/city-create-edit.component';
import {City} from '../../../shared/models/city';

@Component({
  selector: 'app-city',
  imports: [MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatInputModule, RouterModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  cityService = inject(CityService);
  departmentService = inject(DepartmentService)

  departments: Department[] = [];

  displayedColumns = ['id', 'codigo', 'nombre', 'departamento', 'acciones']
  dataSource = new MatTableDataSource<City>();

  totalItems: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {}

  ngOnInit() {
    this.cityService.index().subscribe((res) => {
      this.dataSource.data = res.body;
      this.totalItems = res.body.length;
    });

    this.departmentService.index().subscribe(res => {
      this.departments = res.body;
    });
  }

  onPageChange(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCreateOrUpdate(data?: any) {
    const dialogRef = this.dialog.open(CityCreateEditComponent,
      {
        data: {
          city: data,
          departments: this.departments
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        result.data.department = this.departments.filter(department => department.id === result.data.department)[0];

        if (result.data !== undefined && !result.isEdit) {
          delete result.data.id;
          this.cityService.create(result.data).subscribe((res) => {
            if (res.code == '201') {
              this.ngOnInit();
            }
          });
        } else {
          this.cityService.update(result.data).subscribe((res) => {
            if(res.code == '200') {
              this.ngOnInit();
            }
          });
        }
      }
    });
  }
}
