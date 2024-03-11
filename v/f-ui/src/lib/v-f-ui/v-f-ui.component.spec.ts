import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VFUiComponent } from './v-f-ui.component';

describe('VFUiComponent', () => {
  let component: VFUiComponent;
  let fixture: ComponentFixture<VFUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VFUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VFUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
