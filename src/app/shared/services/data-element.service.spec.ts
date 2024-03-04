import { TestBed } from '@angular/core/testing';

import { DataElementService } from './data-element.service';

describe('DataElementService', () => {
  let service: DataElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
