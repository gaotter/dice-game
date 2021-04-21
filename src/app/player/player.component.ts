import { Component, OnInit } from '@angular/core';
import { GameEngineService, Player, Step } from './../game-engine.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  activePlayer:Player;
  activeStepIndex:number;
  activeStep:Step;
  done:boolean;

  constructor(private gameEngineService:GameEngineService) { }

  ngOnInit(): void {
    this.gameEngineService.activePlayerObsevable.subscribe(p => {
      this.activePlayer = p;
      this.activeStep = this.activePlayer.steps[0];
      this.activeStepIndex = 1;
      this.done = false;
    });
  }

  nextStep()
  {
    if(this.activeStepIndex <this.activePlayer.steps.length)
    {
      this.activeStep = this.activePlayer.steps[this.activeStepIndex];
      this.activeStepIndex = this.activeStepIndex + 1;
    } else {
      this.done = true;
      this.setDone();
    }
  }

  setDone(): void {
      this.gameEngineService.onPlayerIsDone(this.activePlayer);
  }

}
