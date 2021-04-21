import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameEngineService {
  players: Player[] = [
    {
      name:"Bob",
      roundPoints: 0,
      totalPoints: 0,
      steps:[]
    },
    {
      name:"Knut",
      roundPoints: 0,
      totalPoints: 0,
      steps:[]
    },
    {
      name:"Lasse",
      roundPoints: 0,
      totalPoints: 0,
      steps:[]
    },
  ];
  steps: Step[] = [];
  dices: Dice[] = [];
  rounds:number = 3;
  round:number = 0;

  roundSubs:Subscription[] = [];

  private activePlayerSubject: BehaviorSubject<Player> = new BehaviorSubject<Player>(
    null
  );
  public activePlayerObsevable: Observable<Player> = this.activePlayerSubject.pipe(filter(p => p != null));
  private playerDoneAction: Subject<Player> = new Subject<Player>();
  private roundDoneActions: Subject<void> = new Subject<void>();

  constructor() {
    this.setUpSteps();
    this.players.forEach((e, i) => {
      e.id = i;
      e.steps = this.steps;
    });



    this.roundDoneActions.subscribe(() => {
       if(this.round < this.rounds) {
         this.round += 1;
         this.startRound();
       }

    });
  }

  startRound() {
    // init
    this.roundSubs.forEach(s => {
      if(!s.closed) {
        s.unsubscribe();
      }
    });

    this.roundSubs = [];

    const player = this.players[0];
    console.log(this.players);
    if(player != null) {
    this.activePlayerSubject.next(player);
    }

    const playerSub = this.playerDoneAction.subscribe((player) => {
      const nextPlayer = this.players.find((p) => !p.hasRoled);
      if (nextPlayer !== null) {
        nextPlayer.steps = this.steps;
        this.activePlayerSubject.next(nextPlayer);
      } else {
        this.roundDoneActions.next();
      }
    });

    this.roundSubs.push(playerSub);
  }

  onPlayerIsDone(player: Player) {
    player.hasRoled = true;
    this.playerDoneAction.next(player);
  }

  setUpSteps() {
    this.steps.push({
      description: 'Trow dice 1',
      stepType: 'role',
    });
    this.steps.push({
      description: 'Trow dice 2',
      stepType: 'role',
    });
    this.steps.push({
      description: 'Trow dice 3',
      stepType: 'role',
    });

    this.steps.push({
      description: 'Bet',
      stepType: 'bet',
    });
  }

  roleDices(dices: Dice[]): Dice[] {
    var dicesToThrow = dices.filter((d) => !d.hold);

    dicesToThrow.forEach((d) => (d.value = Math.random() * 6 + 1));

    return dicesToThrow;
  }
}

export class Player {
  name:string;
  totalPoints: number;
  roundPoints: number;
  id?: number;
  hasRoled?: boolean;
  steps:Step[];
}

export class Step {
  description: string;
  stepType: 'role' | 'bet' | 'start' | 'hold';
  isDone?: boolean;
}

export interface Dice {
  hold: boolean;
  value: number;
}

export interface GameModel {
  players: Player[];
  activePlayer: Player;
  roundStep: Step[];
  initStep: Step;
  last: Step;
}
