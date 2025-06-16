import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishInterviewDialogComponent } from './finish-interview-dialog.component';

describe('FinishInterviewDialogComponent', () => {
  let component: FinishInterviewDialogComponent;
  let fixture: ComponentFixture<FinishInterviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishInterviewDialogComponent]
    });
    fixture = TestBed.createComponent(FinishInterviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
