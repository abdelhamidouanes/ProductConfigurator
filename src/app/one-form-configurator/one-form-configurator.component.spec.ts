import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneFormConfiguratorComponent } from './one-form-configurator.component';

describe('OneFormConfiguratorComponent', () => {
  let component: OneFormConfiguratorComponent;
  let fixture: ComponentFixture<OneFormConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneFormConfiguratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneFormConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
