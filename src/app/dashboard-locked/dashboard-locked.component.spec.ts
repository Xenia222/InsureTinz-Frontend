import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLockedComponent } from './dashboard-locked.component';

describe('DashboardLockedComponent', () => {
  let component: DashboardLockedComponent;
  let fixture: ComponentFixture<DashboardLockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLockedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
