import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VInputCompositionComponent } from './v-input-composition.component';

describe('VInputComponent', () => {
  let component: VInputCompositionComponent;
  let fixture: ComponentFixture<VInputCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VInputCompositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VInputCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
