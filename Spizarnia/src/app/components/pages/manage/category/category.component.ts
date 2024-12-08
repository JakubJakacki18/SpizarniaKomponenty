import { Component } from '@angular/core';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-category',
  imports: [AddCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
