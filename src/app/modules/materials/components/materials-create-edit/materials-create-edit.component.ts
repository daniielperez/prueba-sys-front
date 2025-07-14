import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import { City } from '../../../../shared/models';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-materials-create-edit',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  imports: [MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './materials-create-edit.component.html',
  styleUrl: './materials-create-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCreateEditComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<MaterialsCreateEditComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  private readonly now = new Date();

  readonly minDate = new Date(this.now.getFullYear() , 0, 1);
  readonly maxDate = this.now;


  cities: City[] = [];
  isEdit = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      datePurchase: new FormControl('', Validators.required),
      dateSale: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    },
    { validators: this.dateValidator.bind(this) }
    );
  }

  states = [
    { id: 'ACTIVO', name: 'ACTIVO'},
    { id: 'DISPONIBLE', name: 'DISPONIBLE'},
    { id: 'ASIGNADO', name: 'ASIGNADO'}
  ];

  ngOnInit() {
    this.isEdit = this.data?.material !== undefined;
    this.cities = this.data.cities;
    if (this.isEdit) {
      this.form.patchValue({
        id: this.data.material.id,
        name: this.data.material.name,
        description: this.data.material.description,
        type: this.data.material.type,
        price: this.data.material.price,
        datePurchase: this.data.material.datePurchase,
        dateSale: this.data.material.dateSale,
        status: this.data.material.status,
        city: this.data.material.city.id,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dateValidator(form: FormGroup) {
    const datePurchase = form.get('datePurchase')?.value;
    const dateSale = form.get('dateSale')?.value;

    if (datePurchase && dateSale) {
      if (moment(datePurchase).isAfter(dateSale)) {
        form.get('datePurchase')?.setErrors({ invalidDate: true });
        form.get('dateSale')?.setErrors({ invalidDate: true });
      } else {
        form.get('datePurchase')?.setErrors(null);
      }
    } else {
      form.get('datePurchase')?.setErrors(null);
    }

    return null;
  }
}
