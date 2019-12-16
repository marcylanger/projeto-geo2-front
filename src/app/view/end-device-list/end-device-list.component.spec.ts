import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndDeviceListComponent } from './end-device-list.component';

describe('EndDeviceListComponent', () => {
  let component: EndDeviceListComponent;
  let fixture: ComponentFixture<EndDeviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndDeviceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndDeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
