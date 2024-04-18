import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VCompositionComponent } from './v-composition.component';

describe('VInputComponent', () => {
  let component: VCompositionComponent;
  let fixture: ComponentFixture<VCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VCompositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
