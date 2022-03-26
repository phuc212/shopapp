import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBillDetailListComponent } from './import-bill-detail-list.component';

describe('ImportBillDetailListComponent', () => {
  let component: ImportBillDetailListComponent;
  let fixture: ComponentFixture<ImportBillDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBillDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBillDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
