import { Component } from '@angular/core';
import { AddProductComponent } from "./add-product/add-product.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [AddProductComponent,CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
