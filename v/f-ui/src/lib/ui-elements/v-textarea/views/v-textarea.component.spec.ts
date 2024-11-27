import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VTextareaComponent } from './v-textarea.component';

describe('VInputComponent', () => {
  let component: VTextareaComponent;
  let fixture: ComponentFixture<VTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
