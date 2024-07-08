import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserAccountsComponent } from './create-user-accounts.component';

describe('CreateUserAccountsComponent', () => {
  let component: CreateUserAccountsComponent;
  let fixture: ComponentFixture<CreateUserAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
