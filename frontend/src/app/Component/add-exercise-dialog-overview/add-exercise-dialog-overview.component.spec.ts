import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseDialogOverviewComponent } from './add-exercise-dialog-overview.component';

describe('AddExerciseDialogOverviewComponent', () => {
  let component: AddExerciseDialogOverviewComponent;
  let fixture: ComponentFixture<AddExerciseDialogOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExerciseDialogOverviewComponent]
    });
    fixture = TestBed.createComponent(AddExerciseDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
