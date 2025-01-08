import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/partials/confirmation-dialog/confirmation-dialog.component';
import { firstValueFrom } from 'rxjs';
import { EditQuantityComponent } from '../components/pages/grocery-list/edit-quantity/edit-quantity.component';
import { ListOfProductsToBuy } from '../../../../Spizarnia-backend/src/models/ListOfProductsToBuy';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(data : {title : string, message: string}): Promise<boolean> {
    return firstValueFrom(this.dialog.open(ConfirmationDialogComponent, {
        data: data,
        //width: '400px'
    }).afterClosed());
  }
  openEditProductDialog(productOnList : ListOfProductsToBuy) :Promise<number>{
    return firstValueFrom(this.dialog.open(EditQuantityComponent, {
      data: productOnList,
    }).afterClosed());
  }
}
