import { TestBed } from '@angular/core/testing';

import { InstanciaStatusService } from './instancia-status.service';

describe('InstanciaStatusService', () => {
  let service: InstanciaStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanciaStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
