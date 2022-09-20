import { TestBed } from '@angular/core/testing';

import { UserTodoGuardService } from './user-todo-guard.service';

describe('UserTodoGuardService', () => {
  let service: UserTodoGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTodoGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
