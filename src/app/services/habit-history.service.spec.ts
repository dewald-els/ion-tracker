import { TestBed } from '@angular/core/testing';

import { HabitHistoryService } from './habit-history.service';

describe('HabitHistoryService', () => {
  let service: HabitHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
