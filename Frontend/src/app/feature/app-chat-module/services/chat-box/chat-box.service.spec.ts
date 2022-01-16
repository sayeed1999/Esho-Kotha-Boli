import { TestBed } from '@angular/core/testing';

import { ChatBoxService } from './chat-box.service';

describe('ChatBoxService', () => {
  let service: ChatBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
