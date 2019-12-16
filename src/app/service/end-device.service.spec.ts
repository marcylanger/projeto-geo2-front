import { TestBed } from '@angular/core/testing';

import { EndDeviceService } from './end-device.service';

describe('EndDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndDeviceService = TestBed.get(EndDeviceService);
    expect(service).toBeTruthy();
  });
});
