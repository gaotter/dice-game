import { Component, OnInit } from '@angular/core';
import { GameEngineService, Player, Step } from './../game-engine.service';
import {Dice, DiceRolerService} from './../dice-roler.service';

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


  dices:Dice[] = [
    {
      hold:false,
      value:1
    },
    {
      hold:false,
      value:1
    },
    {
      hold:false,
      value:1
    },
    {
      hold:false,
      value:1
    },
    {
      hold:false,
      value:1
    }
  ]

  constructor(public gameEngineService:GameEngineService, private diceRoler:DiceRolerService) { }

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
    if(this.activeStepIndex < this.activePlayer.steps.length)
    {
      this.activeStep = this.activePlayer.steps[this.activeStepIndex];
      this.activeStepIndex = this.activeStepIndex + 1;
    } else {
      this.done = true;
      this.dices.forEach(d => {
        d.value = 1
        d.hold = false});
      this.setDone();
    }
  }

  setDone(): void {
      this.gameEngineService.onPlayerIsDone(this.activePlayer);
  }

  onHold(dice:Dice) {
    dice.hold = !dice.hold;
  }

  roleDice():void{
    this.diceRoler.roleDices(this.dices);
    var res = this.diceRoler.checkPoint(this.dices.map(d => d.value));
    this.activePlayer.hand = res.name;
    this.activePlayer.roundPoints = res.points;
    this.nextStep();

  }

}
