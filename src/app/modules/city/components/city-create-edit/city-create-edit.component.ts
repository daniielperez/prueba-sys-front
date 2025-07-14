import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Department } from '../../../../shared/models';

@Component({
  selector: 'app-city-create-edit',
  imports: [MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './city-create-edit.component.html',
  styleUrl: './city-create-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCreateEditComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CityCreateEditComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  departments: Department[] = [];
  isEdit = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
        id: new FormControl(''),
        code: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
      }
    );
  }

  ngOnInit() {
    this.isEdit = this.data?.city !== undefined;
    this.departments = this.data.departments;

    if (this.isEdit) {
      this.form.patchValue({
        id: this.data.city.id,
        code: this.data.city.code,
        name: this.data.city.name,
        department: this.data.city.department.id,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
