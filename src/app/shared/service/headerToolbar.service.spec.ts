/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderToolbarService } from './headerToolbar.service';

describe('Service: HeaderToolbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderToolbarService]
    });
  });

  it('should ...', inject([HeaderToolbarService], (service: HeaderToolbarService) => {
    expect(service).toBeTruthy();
  }));
});
