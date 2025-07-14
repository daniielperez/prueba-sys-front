import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCreateEditComponent } from './city-create-edit.component';

describe('CityCreateEditComponent', () => {
  let component: CityCreateEditComponent;
  let fixture: ComponentFixture<CityCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
