import { Injectable } from '@angular/core';
import { MatSnackBar,   MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarAlertService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

constructor(private snackBar : MatSnackBar) { }

showMensage(msn:string, colorPanel?: string){
  this.snackBar.open(
    msn,
    "x", {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [colorPanel]

    });
}

}

/******************
 * Calss Painel
 ******************
 * successPanel
 * dangerPanel
 * WarningPanel
 *
 *
 */
