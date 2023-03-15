import { TestBed } from '@angular/core/testing';

import { PrivateUserOnlyGuard } from './private-user-only.guard';

describe('PrivateUserOnlyGuard', () => {
  let guard: PrivateUserOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrivateUserOnlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
