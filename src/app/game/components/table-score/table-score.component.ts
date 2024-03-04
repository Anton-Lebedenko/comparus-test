import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-score',
  templateUrl: './table-score.component.html',
  styleUrl: './table-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableScoreComponent {
  @Input() public playerScore: number | null = 0;
  @Input() public computerScore: number | null = 0;
}
