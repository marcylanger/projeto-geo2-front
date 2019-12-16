import { TestBed } from '@angular/core/testing';

import { AreaProdutivaService } from './area-produtiva.service';

describe('AreaProdutivaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaProdutivaService = TestBed.get(AreaProdutivaService);
    expect(service).toBeTruthy();
  });
});
