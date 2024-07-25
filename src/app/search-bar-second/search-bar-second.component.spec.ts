import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarSecondComponent } from './search-bar-second.component';

describe('SearchBarSecondComponent', () => {
  let component: SearchBarSecondComponent;
  let fixture: ComponentFixture<SearchBarSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarSecondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
