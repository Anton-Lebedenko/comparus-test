import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { PlayingFieldComponent } from './components/playing-field/playing-field.component';
import { TableScoreComponent } from './components/table-score/table-score.component';
import { PlayingElementComponent } from './components/playing-element/playing-element.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [PlayingFieldComponent, TableScoreComponent, PlayingElementComponent],
  exports: [PlayingFieldComponent]
})
export class GameModule {}
