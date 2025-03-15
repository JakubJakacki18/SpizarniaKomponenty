import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/partials/header/header.component';
import { ProductModelComponent } from './components/pages/manage/product-model/product-model.component';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';
import { environment } from '../../assets/env';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private pushNotificationService: NotificationService) {}

  ngOnInit(): void {
    this.pushNotificationService.subscribeToNotifications();
  }
}
