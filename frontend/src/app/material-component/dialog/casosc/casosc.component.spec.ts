import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoscComponent } from './casosc.component';

describe('CasoscComponent', () => {
  let component: CasoscComponent;
  let fixture: ComponentFixture<CasoscComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CasoscComponent]
    });
    fixture = TestBed.createComponent(CasoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
