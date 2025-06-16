import { TestBed } from '@angular/core/testing';

import { PacienteVirtualService } from './paciente-virtual.service';

describe('PacienteVirtualService', () => {
  let service: PacienteVirtualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteVirtualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
