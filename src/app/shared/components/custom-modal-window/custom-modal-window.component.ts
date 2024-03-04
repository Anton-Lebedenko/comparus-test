import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalDataConfig } from "./models";

@Component({
  selector: 'app-custom-modal-window',
  templateUrl: './custom-modal-window.component.html',
  styleUrls: ['./custom-modal-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomModalWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalDataConfig) {}
}
