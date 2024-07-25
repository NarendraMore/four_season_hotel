import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCountComponent } from './vehicle-count.component';

describe('VehicleCountComponent', () => {
  let component: VehicleCountComponent;
  let fixture: ComponentFixture<VehicleCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleCountComponent]
    });
    fixture = TestBed.createComponent(VehicleCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
