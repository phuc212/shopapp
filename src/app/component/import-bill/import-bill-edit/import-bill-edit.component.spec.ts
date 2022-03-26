import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBillEditComponent } from './import-bill-edit.component';

describe('ImportBillEditComponent', () => {
  let component: ImportBillEditComponent;
  let fixture: ComponentFixture<ImportBillEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBillEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
