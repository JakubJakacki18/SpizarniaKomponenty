import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { Category } from '../../../../../shared/models/Category';

@Component({
  selector: 'app-add-product',
  imports: [MatListModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
  productForm: FormGroup;

  categories: Category[] =[];
  categoriesControl = new FormControl();
  constructor() {
    this.productForm = new FormGroup({
      categories: this.categoriesControl,
    });}
  }
