import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DepartmentService } from '../services/department.service';
import { Department } from '../../../shared/models/department';
import { DepartmentCreateEditComponent } from './department-create-edit/department-create-edit.component';

@Component({
  selector: 'app-department',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
})
export class DepartmentComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  departmentService = inject(DepartmentService);

  displayedColumns = ['id', 'codigo', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<Department>();

  totalItems: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {}

  ngOnInit() {
    this.departmentService.index().subscribe((res) => {
      this.dataSource.data = res.body;
      this.totalItems = res.body.length;
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
    const dialogRef = this.dialog.open(DepartmentCreateEditComponent, {
      data: {
        department: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result.data !== undefined && !result.isEdit) {
          delete result.data.id;
          this.departmentService.create(result.data).subscribe((res) => {
            if (res.code == '201') {
              this.ngOnInit();
            }
          });
        } else {
          this.departmentService.update(result.data).subscribe((res) => {
            if (res.code == '200') {
              this.ngOnInit();
            }
          });
        }
      }
    });
  }
}
