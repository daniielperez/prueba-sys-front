import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsCreateEditComponent } from './materials-create-edit.component';

describe('MaterialsCreateEditComponent', () => {
  let component: MaterialsCreateEditComponent;
  let fixture: ComponentFixture<MaterialsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
