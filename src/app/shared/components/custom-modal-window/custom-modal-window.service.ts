import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { CustomModalWindowComponent } from "./custom-modal-window.component";

@Injectable({
  providedIn: 'root'
})
export class CustomModalWindowService {
  constructor(private dialog: MatDialog) {}

  public openModal(config: MatDialogConfig): MatDialogRef<any> {
   return this.dialog.open(CustomModalWindowComponent, config);
  }
}
