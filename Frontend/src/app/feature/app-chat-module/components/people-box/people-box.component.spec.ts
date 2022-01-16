import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleBoxComponent } from './people-box.component';

describe('PeopleBoxComponent', () => {
  let component: PeopleBoxComponent;
  let fixture: ComponentFixture<PeopleBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
