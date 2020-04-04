import { TestBed } from '@angular/core/testing';

import { DatasService } from './datas.service';

describe('DatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasService = TestBed.get(DatasService);
    expect(service).toBeTruthy();
  });
});
