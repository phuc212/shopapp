import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBillListComponent } from './import-bill-list.component';

describe('ImportBillListComponent', () => {
  let component: ImportBillListComponent;
  let fixture: ComponentFixture<ImportBillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportBillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
