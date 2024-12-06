import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../../../services/container.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-containers',
  imports: [RouterModule],
  templateUrl: './containers.component.html',
  styleUrl: './containers.component.css'
})
export class ContainersComponent implements OnInit{
  containers : any;
  constructor(private containerService: ContainerService){}
  ngOnInit()
  {  
    this.fetchContainers();
  }

  fetchContainers(): void {
    this.containerService.getAllContainers().subscribe({
      next: (data) => (this.containers = data),
      error: (err) => console.error('Error fetching Containers:', err),
    });
  }
}
