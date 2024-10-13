import { TestBed } from '@angular/core/testing';
import { DonationComponent } from './donation.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationComponent],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(DonationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
