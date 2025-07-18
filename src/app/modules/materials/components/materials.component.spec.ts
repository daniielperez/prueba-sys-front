import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsComponent } from './materials.component';

describe('MaterialComponent', () => {
  let component: MaterialsComponent;
  let fixture: ComponentFixture<MaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
