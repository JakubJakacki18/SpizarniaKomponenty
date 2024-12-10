import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-containers',
  imports: [RouterModule, CommonModule],
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  categories: Array<{ categoryName: string }> = [];
  rows: Array<Array<{ categoryName: string }>> = [];

  constructor(private categoryService: CategoryService) { }

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
        this.splitIntoRows();
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
        alert('Nie udało się załadować kategorii.');
      },
    });
  }

  splitIntoRows(): void {
    const rowSize = 6; // Maksymalna liczba kategorii w rzędzie
    this.rows = [];
    for (let i = 0; i < this.categories.length; i += rowSize) {
      this.rows.push(this.categories.slice(i, i + rowSize));
    }
  }
}
