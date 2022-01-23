import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadruleComponent } from './uploadrule/uploadrule.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CommonModule } from '@angular/common';

const routes:Routes = [
      {path:'uploadrules', component:UploadruleComponent},
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
