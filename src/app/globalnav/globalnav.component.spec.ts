import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalnavComponent } from './globalnav.component';

describe('GlobalnavComponent', () => {
  let component: GlobalnavComponent;
  let fixture: ComponentFixture<GlobalnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
