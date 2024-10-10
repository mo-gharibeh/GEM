import { TestBed } from '@angular/core/testing';

import { DimaUrlServiceService } from './dima-url-service.service';

describe('DimaUrlServiceService', () => {
  let service: DimaUrlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimaUrlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
