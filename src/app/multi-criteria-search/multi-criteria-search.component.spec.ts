import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCriteriaSearchComponent } from './multi-criteria-search.component';

describe('MultiCriteriaSearchComponent', () => {
  let component: MultiCriteriaSearchComponent;
  let fixture: ComponentFixture<MultiCriteriaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiCriteriaSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCriteriaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
