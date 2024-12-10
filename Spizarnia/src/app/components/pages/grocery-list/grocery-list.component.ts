import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-grocery-list',
imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, RouterModule],
templateUrl: './grocery-list.component.html',
  styleUrl: './grocery-list.component.css'
})
export class GroceryListComponent {
    searchTerm: string = '';
     dataSource = new MatTableDataSource<any>([]);
    onSearch() {
    if (this.searchTerm.length >= 3) {
      const searchTermLower = this.searchTerm.toLowerCase();

      this.dataSource.filter = searchTermLower; // Użycie wbudowanego filtrowania w MatTableDataSource
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.name.toLowerCase().includes(filter); // Wyszukiwanie po nazwie
      };
    } else {
      this.dataSource.filter = ''; // Reset filtra
    }
  }
}
