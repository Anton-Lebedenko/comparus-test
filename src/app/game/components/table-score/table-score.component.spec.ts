import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableScoreComponent } from './table-score.component';

describe('TableScoreComponent', () => {
  let component: TableScoreComponent;
  let fixture: ComponentFixture<TableScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
