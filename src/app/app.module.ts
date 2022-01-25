import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    SettingsComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
