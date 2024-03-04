import { NgModule } from '@angular/core';
import { StartPageComponent } from './start-page/start-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatButtonModule,
    RouterModule
  ],
  declarations: [StartPageComponent],
  exports: [StartPageComponent]
})
export class MenuModule {}
