import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPurchaseHistoryComponent } from './credit-purchase-history.component';

describe('CreditPurchaseHistoryComponent', () => {
  let component: CreditPurchaseHistoryComponent;
  let fixture: ComponentFixture<CreditPurchaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditPurchaseHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
