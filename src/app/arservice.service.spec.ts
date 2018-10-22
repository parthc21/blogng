import { TestBed } from '@angular/core/testing';

import { ArserviceService } from './arservice.service';

describe('ArserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArserviceService = TestBed.get(ArserviceService);
    expect(service).toBeTruthy();
  });
});
