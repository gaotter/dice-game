import { Component, OnInit } from '@angular/core';
import { DiceRolerService } from '../dice-roler.service';
import { GameEngineService, Player } from '../game-engine.service';

@Component({
  selector: 'mgmo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private diceRoler:DiceRolerService, private gameEngin:GameEngineService) { }

  rules:string = "";
  players:string = "";

  ngOnInit(): void {
    this.rules = JSON.stringify(this.diceRoler.rules, null, 4);
    const playersData = this.gameEngin.players.map(p => ({"name": p.name}));
    this.players = JSON.stringify(playersData, null, 4);
  }

  upload(data) {
      console.log(data.value);
      this.diceRoler.rules = JSON.parse(data.value);
  }

  uploadPlayer(data) {
    console.log(data.value);
    const players:Player[] = JSON.parse(data.value);
    this.gameEngin.players = [...players];
    this.gameEngin.setPlayerSteps();
  }


}
