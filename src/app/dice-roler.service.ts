import { Injectable, Input } from '@angular/core';
import {IRules} from './Models/IRules';

@Injectable({
  providedIn: 'root'
})
export class DiceRolerService {

  rules:IRules[] = [
    {
      point:100,
      pattern:['x','x'],
      name:"One Pair"
    },
    {
      point:200,
      pattern:['x','x','y','y'],
      name:"Two Pair"
    },
    {
      point:300,
      pattern:['x','x','x'],
      name:"Three of a kind"
    },
    {
      point:400,
      pattern:['1','2','3','4','5'],
      name:"Small Straight"
    },
    {
      point:450,
      pattern:['2','3','4','5','6'],
      name:"Large Straight"
    },
    {
      point:500,
      pattern:['x','x','x','y','y'],
      name:"Full house"
    },
    {
      point:600,
      pattern:['x','x','x','x'],
      name:"Four of a kind"
    },
    {
      point:1200,
      pattern:['x','x','x','x','x'],
      name:"Five of a kind"
    }
  ]


  constructor() { }



  roleDices(dices: Dice[]): Dice[] {
    var dicesToThrow = dices.filter((d) => !d.hold);

    dicesToThrow.forEach((d) => (d.value = Math.floor(Math.random() * 6 + 1)));

    return dicesToThrow;
  }

   checkPoint(dicesValues:number[])
   {
      dicesValues.sort();

      var sum = 0;
      var totalSum = 0;
      var name = '';
       dicesValues.forEach(d => {sum = sum + d});

       var last = dicesValues[0];
       var count = 0;
       var currnetPattern = [];
       var sameCount = [];
       dicesValues.forEach(d => {
            var same = last == 0 || last == d;

            last = d;
            if(!same) {
              if(count > 1)
                sameCount.push(count);
              count = 0;
            }
            count = count + 1;
            currnetPattern.push(d.toString());
       });

       sameCount.push(count);

       this.rules.forEach(r => {

           const sameX = r.pattern.filter(s => s == 'x');
           const samez = r.pattern.filter(s => s == 'z');
           const samey = r.pattern.filter(s => s == 'y');

           var match = r.pattern.every(f => currnetPattern.some(d => d == f));

           const hasXPattern = sameX.length > 0;
           const hasYPattern = samey.length > 0;
           const hasZPattern = samez.length > 0;

           var sameCountCopy = [...sameCount];
           var hasSameCount = false;

           if(hasXPattern && !hasYPattern && !hasZPattern){
               hasSameCount = sameCountCopy.some(sc => sc == sameX.length);
           }

           if(hasXPattern && hasYPattern && !hasZPattern) {
             var matchXIndex = sameCountCopy.findIndex(sc => sc == sameX.length);
             if(matchXIndex > -1) {
               sameCountCopy[matchXIndex] = 0;
             }
             var hasYMach = sameCountCopy.some(sc => sc == samey.length);

             hasSameCount = matchXIndex > -1 && hasYMach;
           }

           if(hasXPattern && hasYPattern && hasZPattern) {
             var matchXIndex = sameCountCopy.findIndex(
               (sc) => sc == sameX.length
             );
             if (matchXIndex > -1) {
               sameCountCopy[matchXIndex] = 0;
             }

             var matchYIndex = sameCountCopy.findIndex(
               (sc) => sc == samey.length
             );
             if (matchYIndex > -1) {
               sameCountCopy[matchYIndex] = 0;
             }

             var hasZMach = sameCountCopy.some((sc) => sc == samez.length);

             hasSameCount = matchXIndex > -1 && matchYIndex > -1 && hasZMach;
           }

           if(match || hasSameCount ) {
             const newValue = r.point + sum;
             name = newValue > totalSum ? r.name : name;
            totalSum = newValue > totalSum ? newValue : totalSum;

           }
       });

       console.log(currnetPattern,sameCount, totalSum, name, sum, totalSum <= 0 ? sum : totalSum );

       return {points:(totalSum <= 0 ? sum : totalSum), name:name};

   }

}

export interface Dice {
  hold: boolean;
  value: number;
}
