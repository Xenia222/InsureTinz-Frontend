import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserSucessComponent } from './create-user-sucess.component';

describe('CreateUserSucessComponent', () => {
  let component: CreateUserSucessComponent;
  let fixture: ComponentFixture<CreateUserSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserSucessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
