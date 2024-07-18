import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtnMomoModalComponent } from './mtn-momo-modal.component';

describe('MtnMomoModalComponent', () => {
  let component: MtnMomoModalComponent;
  let fixture: ComponentFixture<MtnMomoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MtnMomoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MtnMomoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
