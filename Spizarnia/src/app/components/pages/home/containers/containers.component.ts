import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../../../services/container.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-containers',
  imports: [RouterModule , CommonModule],
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  containers: any[] = [];
  rows: any[] = [];

  constructor(private containerService: ContainerService) { }

  ngOnInit() {
    this.fetchContainers();
  }

  fetchContainers(): void {
    this.containerService.getAllContainers().subscribe({
      next: (data) => {
        this.containers = data;
        this.splitIntoRows(); // Podział na rzędy
      },
      error: (err) => console.error('Error fetching Containers:', err),
    });
  }

  // Funkcja dzieląca kontenery na rzędy
  splitIntoRows(): void {
    const rowSize = 5; // Maksymalna liczba kontenerów w rzędzie
    this.rows = [];

    for (let i = 0; i < this.containers.length; i += rowSize) {
      this.rows.push(this.containers.slice(i, i + rowSize));
    }
  }
}
