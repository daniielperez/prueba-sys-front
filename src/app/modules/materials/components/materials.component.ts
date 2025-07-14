import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Material} from '../../../shared/models/material';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MaterialService} from '../services/material.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MaterialsCreateEditComponent} from './materials-create-edit/materials-create-edit.component';
import {MatSort} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {CityService} from '../../city/services/city.service';
import {City} from '../../../shared/models/city';

@Component({
  selector: 'app-material',
  imports: [MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatInputModule, RouterModule],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss'
})
export class MaterialsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  materialService = inject(MaterialService);


  cityService = inject(CityService)
  cities: City[] = [];

  displayedColumns = ['id', 'nombre', 'descripcion', 'tipo', 'fecha_compra', 'fecha_venta', 'estado', 'ciudad', 'acciones']
  dataSource = new MatTableDataSource<Material>();

  totalItems: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor() {}

  ngOnInit() {
    this.materialService.index().subscribe((res) => {
      this.dataSource.data = res.body;
      this.totalItems = res.body.length;
    });

    this.cityService.index().subscribe(res => {
      this.cities = res.body;
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
    const dialogRef = this.dialog.open(MaterialsCreateEditComponent,
      {
        data: {
          material: data,
          cities: this.cities
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        result.data.city = this.cities.filter(city => city.id === result.data.city)[0];

        if (result.data !== undefined && !result.isEdit) {
          delete result.data.id;
          this.materialService.create(result.data).subscribe((res) => {
            if (res.code == '201') {
              this.ngOnInit();
            }
          });
        } else {
          this.materialService.update(result.data).subscribe((res) => {
            if(res.code == '200') {
              this.ngOnInit();
            }
          });
        }
      }
    });
  }
}
