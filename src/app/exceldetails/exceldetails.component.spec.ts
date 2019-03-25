import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceldetailsComponent } from './exceldetails.component';

describe('ExceldetailsComponent', () => {
  let component: ExceldetailsComponent;
  let fixture: ComponentFixture<ExceldetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceldetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
