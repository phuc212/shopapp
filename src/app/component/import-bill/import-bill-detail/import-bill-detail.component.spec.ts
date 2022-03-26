import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBillDetailComponent } from './import-bill-detail.component';

describe('ImportBillDetailComponent', () => {
  let component: ImportBillDetailComponent;
  let fixture: ComponentFixture<ImportBillDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBillDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
