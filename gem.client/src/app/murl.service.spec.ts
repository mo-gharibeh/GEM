import { TestBed } from '@angular/core/testing';

import { MurlService } from './murl.service';

describe('MurlService', () => {
  let service: MurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
