import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListFbComponent } from './to-do-list-fb.component';

describe('ToDoListFbComponent', () => {
  let component: ToDoListFbComponent;
  let fixture: ComponentFixture<ToDoListFbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListFbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
