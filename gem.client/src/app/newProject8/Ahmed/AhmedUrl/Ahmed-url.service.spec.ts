import { TestBed } from '@angular/core/testing';

import { AhmedUrlService } from './Ahmed-url.service';

describe('UrlService', () => {
  let service: AhmedUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhmedUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
