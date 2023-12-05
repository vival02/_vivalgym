import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWorkoutComponent } from './display-workout.component';

describe('DisplayWorkoutComponent', () => {
  let component: DisplayWorkoutComponent;
  let fixture: ComponentFixture<DisplayWorkoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayWorkoutComponent]
    });
    fixture = TestBed.createComponent(DisplayWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
