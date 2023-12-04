import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FCoreComponent } from './f-core.component';

describe('FCoreComponent', () => {
  let component: FCoreComponent;
  let fixture: ComponentFixture<FCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FCoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
