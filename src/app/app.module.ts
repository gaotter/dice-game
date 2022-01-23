import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { UploadruleComponent } from './uploadrule/uploadrule.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    UploadruleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
