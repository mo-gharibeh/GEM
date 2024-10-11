import { TestBed } from '@angular/core/testing';

import { BassamUrlService } from './bassam-url.service';

describe('BassamUrlService', () => {
  let service: BassamUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BassamUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
