import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingElementComponent } from './playing-element.component';

describe('PlayingElementComponent', () => {
  let component: PlayingElementComponent;
  let fixture: ComponentFixture<PlayingElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayingElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
