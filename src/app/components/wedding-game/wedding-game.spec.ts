import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingGame } from './wedding-game';

describe('WeddingGame', () => {
  let component: WeddingGame;
  let fixture: ComponentFixture<WeddingGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeddingGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
