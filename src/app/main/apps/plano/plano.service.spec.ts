import { TestBed } from '@angular/core/testing';

import { PlanoService } from './plano.service';

describe('PlanoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanoService = TestBed.get(PlanoService);
    expect(service).toBeTruthy();
  });
});
