import { TestBed } from '@angular/core/testing';
import { LeoComponent } from './leo.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeoComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(LeoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
