import { inject, Injectable } from '@angular/core';
import { SnackBarResultType } from '../shared/constances/additional.types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarDurationInSeconds } from '../shared/constances/additional.const';
import { SnackBarComponent } from '../components/partials/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);
  constructor() { }

  openSnackBar(message : string, action : SnackBarResultType): void {
      let snackBarAction : {className : string, title : string} = {className : '', title : ''};
      switch (action) {
        case SnackBarResultType.Error:
          snackBarAction.title ='Błąd!';
          snackBarAction.className = 'snackbar-error';
          break;
        case SnackBarResultType.Success:
          snackBarAction.title ='Sukces!';
          snackBarAction.className = 'snackbar-success';
          break;
        case SnackBarResultType.Info:
          snackBarAction.title ='Informacja!';
          snackBarAction.className = 'snackbar-info';
          break;
        default:
          snackBarAction.title ='Informacja!';
          snackBarAction.className = 'snackbar-info';
          break;
      }
      this._snackBar.openFromComponent(SnackBarComponent,
        {
          data: {
            message,
            title: snackBarAction.title,
            className: snackBarAction.className,
          },
          duration : SnackBarDurationInSeconds,
          panelClass: snackBarAction.className
        });
     }
    }

