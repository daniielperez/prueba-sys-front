import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  selector: 'app-department-create-edit',
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './department-create-edit.component.html',
  styleUrl: './department-create-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentCreateEditComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DepartmentCreateEditComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  isEdit = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: new FormControl(''),
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.isEdit = this.data?.department !== undefined;
    if (this.isEdit) {
      this.form.patchValue({
        id: this.data.department.id,
        code: this.data.department.code,
        name: this.data.department.name,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
