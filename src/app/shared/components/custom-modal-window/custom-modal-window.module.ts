import { NgModule } from '@angular/core';
import { CustomModalWindowComponent } from "./custom-modal-window.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ CustomModalWindowComponent ],
  exports: [ CustomModalWindowComponent ],
  imports: [ MatDialogModule, MatButtonModule, RouterModule ]
})
export class CustomModalWindowModule {}
