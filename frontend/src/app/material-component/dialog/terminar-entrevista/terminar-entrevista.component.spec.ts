import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminarEntrevistaComponent } from './terminar-entrevista.component';

describe('TerminarEntrevistaComponent', () => {
  let component: TerminarEntrevistaComponent;
  let fixture: ComponentFixture<TerminarEntrevistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminarEntrevistaComponent]
    });
    fixture = TestBed.createComponent(TerminarEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
