import { TestBed } from '@angular/core/testing';

import { LujainURLService } from './lujain-url.service';

describe('LujainURLService', () => {
  let service: LujainURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LujainURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
