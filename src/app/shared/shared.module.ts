import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataElementService } from './services/data-element.service';
import { CustomModalWindowModule } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [DataElementService],
  exports: [CommonModule, CustomModalWindowModule]
})
export class SharedModule {}
