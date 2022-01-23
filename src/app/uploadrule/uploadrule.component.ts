import { Component, OnInit } from '@angular/core';
import { DiceRolerService } from '../dice-roler.service';

@Component({
  selector: 'app-uploadrule',
  templateUrl: './uploadrule.component.html',
  styleUrls: ['./uploadrule.component.scss']
})
export class UploadruleComponent implements OnInit {

  constructor(private diceRoler:DiceRolerService) { }

  rules:string = "";

  ngOnInit(): void {
    this.rules = JSON.stringify(this.diceRoler.rules, null, 4);
  }

  upload(data) {
      console.log(data.value);
      this.diceRoler.rules = JSON.parse(data.value);
  }


}
