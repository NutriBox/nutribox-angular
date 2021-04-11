/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SnackBarAlertService } from './snackBarAlert.service';

describe('Service: SnackBarAlert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarAlertService]
    });
  });

  it('should ...', inject([SnackBarAlertService], (service: SnackBarAlertService) => {
    expect(service).toBeTruthy();
  }));
});
