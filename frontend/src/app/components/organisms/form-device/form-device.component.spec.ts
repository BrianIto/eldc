import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeviceComponent } from './form-device.component';

describe('FormDeviceComponent', () => {
  let component: FormDeviceComponent;
  let fixture: ComponentFixture<FormDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
