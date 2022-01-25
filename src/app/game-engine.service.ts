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
    {
      name:"Linda",
      roundPoints: 0,
      totalPoints: 0,
      steps:[]
    }
  ];
  steps: Step[] = [];
  rounds:number = 3;
  round:number = 0;

  roundSubs:Subscription[] = [];

  private playersSubject:BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(this.players);

  private activePlayerSubject: BehaviorSubject<Player> = new BehaviorSubject<Player>(
    null
  );
  public activePlayerObsevable: Observable<Player> = this.activePlayerSubject.pipe(filter(p => p != null));
  public playersObservable: Observable<Player[]> = this.playersSubject.asObservable();
  private playerDoneAction: Subject<Player> = new Subject<Player>();
  private roundDoneActions: Subject<void> = new Subject<void>();

  constructor() {
    this.setUpSteps();
    this.setPlayerSteps();



    this.roundDoneActions.subscribe(() => {
       if(this.round < this.rounds) {
         this.round += 1;
         this.startRound();
       }

    });
  }

  setPlayerSteps() {
    this.players.forEach((e, i) => {
      e.id = i;
      e.steps = this.steps;
    });

    this.playersSubject.next(this.players);
  }

  startRound() {
    // init
    this.players.forEach(p => p.hasRoled = false);
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
      if (!!nextPlayer) {
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
      description: 'Hold',
      stepType: 'hold',
    });
    this.steps.push({
      description: 'Hold',
      stepType: 'hold',
    });
    this.steps.push({
      description: 'Look',
      stepType: 'look',
    });


  }


}

export class Player {
  name:string;
  totalPoints: number;
  roundPoints: number;
  id?: number;
  hasRoled?: boolean;
  steps:Step[];
  hand?:string;
}

export class Step {
  description: string;
  stepType: 'role' | 'bet' | 'start' | 'hold' | 'look';
  isDone?: boolean;
}



export interface GameModel {
  players: Player[];
  activePlayer: Player;
  roundStep: Step[];
  initStep: Step;
  last: Step;
}
