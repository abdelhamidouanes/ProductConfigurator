import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningMsgComponent } from './warning-msg.component';

describe('WarningMsgComponent', () => {
  let component: WarningMsgComponent;
  let fixture: ComponentFixture<WarningMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
