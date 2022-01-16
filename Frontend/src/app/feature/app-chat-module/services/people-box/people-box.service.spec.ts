import { TestBed } from '@angular/core/testing';

import { PeopleBoxService } from './people-box.service';

describe('PeopleBoxService', () => {
  let service: PeopleBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
