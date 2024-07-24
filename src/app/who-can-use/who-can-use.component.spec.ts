import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoCanUseComponent } from './who-can-use.component';

describe('WhoCanUseComponent', () => {
  let component: WhoCanUseComponent;
  let fixture: ComponentFixture<WhoCanUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhoCanUseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhoCanUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
