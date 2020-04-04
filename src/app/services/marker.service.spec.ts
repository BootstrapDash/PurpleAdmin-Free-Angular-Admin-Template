import { TestBed } from '@angular/core/testing';

import { MarkerService } from './marker.service';

describe('MarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkerService = TestBed.get(MarkerService);
    expect(service).toBeTruthy();
  });
});
