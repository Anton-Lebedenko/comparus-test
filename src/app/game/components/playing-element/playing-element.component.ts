import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ElementColorStates } from '../../../shared';

@Component({
  selector: 'app-playing-element',
  templateUrl: './playing-element.component.html',
  styleUrl: './playing-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingElementComponent {
  @Input() public colorState: ElementColorStates = ElementColorStates.DEFAULT;
  @Input() public id!: string;
  @Output() public onClick: EventEmitter<string> = new EventEmitter<string>();
  @HostListener('click') public onClickHandler(): void {
    this.onClick.emit(this.id);
  }
}
