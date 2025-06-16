import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInstanciaComponent } from './manage-instancia.component';

describe('ManageInstanciaComponent', () => {
  let component: ManageInstanciaComponent;
  let fixture: ComponentFixture<ManageInstanciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInstanciaComponent]
    });
    fixture = TestBed.createComponent(ManageInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
