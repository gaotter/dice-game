import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent} from './settings/settings.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CommonModule } from '@angular/common';

const routes:Routes = [
      {path:'settings', component:SettingsComponent},
      {path:'board', component:GameBoardComponent},
      { path: '', redirectTo: '/board', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
