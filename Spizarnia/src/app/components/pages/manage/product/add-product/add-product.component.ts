import { ProductService } from './../../../../../services/product.service';
import { CategoryService } from './../../../../../services/category.service';
import { Component, QueryList, ViewChildren } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatListModule, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Category } from '../../../../../../../../Spizarnia-backend/src/models/Category';
import { CommonModule } from '@angular/common';
import { SimpleDialogComponent } from '../../../../partials/simple-dialog/simple-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { SnackBarResultType } from '../../../../../shared/constances/additional.types';


@Component({
  selector: 'app-add-product',
  providers:[provideNativeDateAdapter()],
  imports: [MatListModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  onSelectionChange(event: MatSelectionListChange,selectionList: MatSelectionList) :void  {
    const selectedOption = event.options.find(option => option.selected); // Znajdź wybraną opcję

    if (selectedOption) {
      this.selectionLists.forEach(list => {
        if (list !== selectionList) {
          list.options.forEach(option => {
            option.selected = false;
          });
        }
      });
}}
  @ViewChildren(MatSelectionList) selectionLists!: QueryList<MatSelectionList>;
selectedProduct: any;
selectedDate: any;
onSubmit() {
  let messageSnackBar : string
  //dataDialog = {title : "Błąd", message:"Wartość wiadomości nie została przypisana"};
  if (this.productForm.valid) {
    this.productService.createProduct(this.productForm.value).subscribe(
    (response) => {
      console.log('Produkt został utworzony:', response);
      messageSnackBar = 'Produkt został pomyślnie utworzony!';
      this.snackBarService.openSnackBar(messageSnackBar,SnackBarResultType.Success);
      this.productForm.reset();
    },
    (error) => {
      console.error('Błąd podczas tworzenia produktu:', error);
      messageSnackBar= 'Wystąpił błąd podczas tworzenia produktu. Spróbuj ponownie.'
      this.snackBarService.openSnackBar(messageSnackBar,SnackBarResultType.Error);

    }
   );
   } else {
     messageSnackBar = 'Formularz jest nieprawidłowy. Uzupełnij wszystkie pola poprawnymi wartościami.'
     this.snackBarService.openSnackBar(messageSnackBar,SnackBarResultType.Error);
      console.log('Formularz jest nieprawidłowy');
   }
}

  productForm: FormGroup;
  todayDate : Date;
  categories: Category[] =[];
  ngOnInit()
  {  
    this.fetchCategories();
    this.productForm = this.fb.group({
      expirationDate: ['',Validators.required],
      purchaseDate: ['',Validators.required],
      selectedProduct: ['', Validators.required],
      },{
        validators: this.dateValidator, // Dodanie walidatora na poziomie grupy
      });
  }
  categoriesControl = new FormControl();
  dateValidator(group: AbstractControl)
  {
    const purchaseDate = group.get('purchaseDate')?.value;
    const expirationDate = group.get('expirationDate')?.value;

    if (purchaseDate && expirationDate) {
      if (new Date(purchaseDate) > new Date(expirationDate)) {
        return { invalidDateRange: true }; 
      }
    }
    return null; 
  }
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private productService:ProductService,  private dialog: MatDialog, private snackBarService : SnackBarService) {
    this.productForm = new FormGroup({
      categories: this.categoriesControl,
    });
    this.todayDate = new Date();
  }

    fetchCategories(): void {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => (this.categories = data),
        error: (err) => {
          this.snackBarService.openSnackBar('Nie udało się pobrać kategorii', SnackBarResultType.Error);          
          console.error('Error fetching ProductModels:', err)
        }
      });
    }
  }
