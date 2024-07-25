import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggageCountComponent } from './luggage-count.component';

describe('LuggageCountComponent', () => {
  let component: LuggageCountComponent;
  let fixture: ComponentFixture<LuggageCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuggageCountComponent]
    });
    fixture = TestBed.createComponent(LuggageCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
