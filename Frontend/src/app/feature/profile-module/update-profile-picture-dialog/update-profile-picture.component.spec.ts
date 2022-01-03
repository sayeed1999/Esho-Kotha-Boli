import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePictureComponent } from './update-profile-picture.component';

describe('UpdateProfilePictureComponent', () => {
  let component: UpdateProfilePictureComponent;
  let fixture: ComponentFixture<UpdateProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfilePictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
