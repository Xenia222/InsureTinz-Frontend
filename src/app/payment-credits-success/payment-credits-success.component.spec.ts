import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreditsSuccessComponent } from './payment-credits-success.component';

describe('PaymentCreditsSuccessComponent', () => {
  let component: PaymentCreditsSuccessComponent;
  let fixture: ComponentFixture<PaymentCreditsSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentCreditsSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentCreditsSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
