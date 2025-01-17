import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { SnackBarResultType } from '../../../../shared/constances/additional.types';

@Component({
  selector: 'app-containers',
  imports: [RouterModule, CommonModule],
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  categories: Array<{ categoryName: string }> = [];
  rows: Array<Array<{ categoryName: string }>> = [];

  constructor(private categoryService: CategoryService, private snackBarService : SnackBarService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        console.log('Fetched categories:', data);
        this.categories = data.map((item: any) => ({
          categoryName: item.categoryName
        }));
        console.log(this.categories);
        this.splitIntoRows();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        this.snackBarService.openSnackBar('Nie udało się pobrać kategorii',SnackBarResultType.Error);
      },
    });
  }

  splitIntoRows(): void {
    const rowSize = 6;
    this.rows = [];
    for (let i = 0; i < this.categories.length; i += rowSize) {
      this.rows.push(this.categories.slice(i, i + rowSize));
    }
  }
}
