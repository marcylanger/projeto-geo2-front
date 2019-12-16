import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndDeviceFormComponent } from './end-device-form.component';

describe('EndDeviceFormComponent', () => {
  let component: EndDeviceFormComponent;
  let fixture: ComponentFixture<EndDeviceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndDeviceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndDeviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
