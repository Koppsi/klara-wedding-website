import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLetter } from './welcome-letter';

describe('WelcomeLetter', () => {
  let component: WelcomeLetter;
  let fixture: ComponentFixture<WelcomeLetter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLetter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLetter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
