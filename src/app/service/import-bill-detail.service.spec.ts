import { TestBed } from '@angular/core/testing';

import { ImportBillDetailService } from './import-bill-detail.service';

describe('ImportBillDetailService', () => {
  let service: ImportBillDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportBillDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
