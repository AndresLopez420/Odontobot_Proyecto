import { TestBed } from '@angular/core/testing';

import { CasoscService } from './casosc.service';

describe('CasoscService', () => {
  let service: CasoscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasoscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
