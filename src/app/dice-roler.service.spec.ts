import { TestBed } from '@angular/core/testing';

import { DiceRolerService } from './dice-roler.service';

describe('DiceRolerService', () => {
  let service: DiceRolerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceRolerService);
  });

  it('should be created', () => {
    var res = service.checkPoint([1,2,4,5,6]);
    console.log(res);
    expect(res).toBeGreaterThan(0);
  });
});
