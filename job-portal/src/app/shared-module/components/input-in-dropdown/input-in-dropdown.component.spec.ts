import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInDropdownComponent } from './input-in-dropdown.component';

describe('InputInDropdownComponent', () => {
  let component: InputInDropdownComponent;
  let fixture: ComponentFixture<InputInDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
