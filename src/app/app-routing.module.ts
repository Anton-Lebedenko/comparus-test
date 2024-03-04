import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './menu/start-page/start-page.component';
import { PlayingFieldComponent } from './game/components/playing-field/playing-field.component';

const routes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'game', component: PlayingFieldComponent },
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
