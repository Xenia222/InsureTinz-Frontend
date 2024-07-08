import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresInformationsComponent } from './structures-informations.component';

describe('StructuresInformationsComponent', () => {
  let component: StructuresInformationsComponent;
  let fixture: ComponentFixture<StructuresInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructuresInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructuresInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
