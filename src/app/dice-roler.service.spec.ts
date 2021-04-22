import { TestBed } from '@angular/core/testing';

import { DiceRolerService } from './dice-roler.service';

describe('DiceRolerService', () => {
  let service: DiceRolerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceRolerService);
  });

  it('should be created', () => {
    service.checkPoint();
    expect(service).toBeTruthy();
  });
});
