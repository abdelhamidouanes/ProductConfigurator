import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsPopUpComponent } from './parts-pop-up.component';

describe('PartsPopUpComponent', () => {
  let component: PartsPopUpComponent;
  let fixture: ComponentFixture<PartsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
