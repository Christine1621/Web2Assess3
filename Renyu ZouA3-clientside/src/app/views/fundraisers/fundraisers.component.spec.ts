import { TestBed } from '@angular/core/testing';
import { FundraisersComponent } from './fundraisers.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundraisersComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(FundraisersComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
