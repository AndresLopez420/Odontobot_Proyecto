import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCasoscComponent } from './manage-casosc.component';

describe('ManageCasoscComponent', () => {
  let component: ManageCasoscComponent;
  let fixture: ComponentFixture<ManageCasoscComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCasoscComponent]
    });
    fixture = TestBed.createComponent(ManageCasoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
