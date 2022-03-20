import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiColumnGridComponent } from './multi-column-grid.component';

describe('MultiColumnGridComponent', () => {
  let component: MultiColumnGridComponent;
  let fixture: ComponentFixture<MultiColumnGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiColumnGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiColumnGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
