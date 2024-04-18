import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VFormComponent } from './v-form.component';

describe('VFormComponent', () => {
  let component: VFormComponent;
  let fixture: ComponentFixture<VFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
