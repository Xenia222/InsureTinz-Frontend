import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedSidebarComponent } from './locked-sidebar.component';

describe('LockedSidebarComponent', () => {
  let component: LockedSidebarComponent;
  let fixture: ComponentFixture<LockedSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockedSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LockedSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
