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
import { Category } from '../../../../../shared/models/Category';
import { CommonModule } from '@angular/common';
import { SimpleDialogComponent } from '../../../../partials/simple-dialog/simple-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { title } from 'process';

@Component({
  selector: 'app-add-product',
  providers:[provideNativeDateAdapter()],
  imports: [MatListModule,
    FormsModule,
    ReactiveFormsModule,
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
  let dataDialog : {title : string, message : string};
  //dataDialog = {title : "Błąd", message:"Wartość wiadomości nie została przypisana"};
  if (this.productForm.valid) {
    this.productService.createProduct(this.productForm.value).subscribe(
    (response) => {
      console.log('Produkt został utworzony:', response);
      dataDialog = {
        title: 'Sukces',
        message: 'Produkt został pomyślnie utworzony!'
      }
      this.dialog.open(SimpleDialogComponent, {data: dataDialog});
      this.productForm.reset();
    },
    (error) => {
      console.error('Błąd podczas tworzenia produktu:', error);
      dataDialog= {
        title: 'Błąd',
        message: 'Wystąpił błąd podczas tworzenia produktu. Spróbuj ponownie.'
      }
      this.dialog.open(SimpleDialogComponent, {data: dataDialog});

    }
   );
   } else {
     dataDialog = {
       title: 'Nieprawidłowy formularz',
       message: 'Formularz jest nieprawidłowy. Uzupełnij wszystkie pola poprawnymi wartościami.'
      }
      this.dialog.open(SimpleDialogComponent, {data: dataDialog});
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
        return { invalidDateRange: true }; // Błąd: data zakupu nie może być większa lub równa dacie ważności
      }
    }
    return null; // Brak błędów
  }
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private productService:ProductService,  private dialog: MatDialog) {
    this.productForm = new FormGroup({
      categories: this.categoriesControl,
    });
    this.todayDate = new Date();
  }

    fetchCategories(): void {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => (this.categories = data),
        error: (err) => console.error('Error fetching ProductModels:', err),
      });
    }
  }
