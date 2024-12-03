import { CategoryService } from './../../../../../services/category.service';
import { Component, QueryList, ViewChildren } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatListModule, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Category } from '../../../../../shared/models/Category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  providers:[provideNativeDateAdapter()],
  imports: [MatListModule,FormsModule,ReactiveFormsModule,MatExpansionModule,MatDatepickerModule,MatButtonModule,MatFormFieldModule,MatInputModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
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
onSubmit() {
  
  
  
  throw new Error('Method not implemented.');
}

  productForm: FormGroup;
  minDate : Date;
  categories: Category[] =[];
  ngOnInit()
  {  
    this.fetchCategories();
    this.productForm = this.fb.group({
      selectedProduct: ['', Validators.required],
      dateOfExpiration: [this.minDate,Validators.required]
      });
  }
  categoriesControl = new FormControl();

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.productForm = new FormGroup({
      categories: this.categoriesControl,
    });
    this.minDate = new Date();
  }

    fetchCategories(): void {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => (this.categories = data),
        error: (err) => console.error('Error fetching ProductModels:', err),
      });
    }
  }
