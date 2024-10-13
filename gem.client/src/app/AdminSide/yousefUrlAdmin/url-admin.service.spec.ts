import { TestBed } from '@angular/core/testing';

import { UrlAdminService } from './url-admin.service';

describe('UrlAdminService', () => {
  let service: UrlAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
