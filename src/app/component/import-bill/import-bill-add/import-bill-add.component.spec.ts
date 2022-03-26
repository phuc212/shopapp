import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBillAddComponent } from './import-bill-add.component';

describe('ImportBillAddComponent', () => {
  let component: ImportBillAddComponent;
  let fixture: ComponentFixture<ImportBillAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBillAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
