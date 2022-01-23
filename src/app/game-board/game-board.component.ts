import { Component, OnInit } from '@angular/core';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(private gameEngineService:GameEngineService) { }

  ngOnInit(): void {
  }

  startRound():void {
    this.gameEngineService.startRound();
  }

}
