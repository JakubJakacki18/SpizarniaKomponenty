import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly VAPID_PUBLIC_KEY = 'BJHYga7RKI0ys4RN8JmRwJFprQvdTm9drDI4Xyw5DSVF-a3a98zoXXTKLBBM0_ADVxHgiK7JT7FwKDsieiznnTs';
  private readonly SUBSCRIPTION_URL = 'http://localhost:5000/api/subscribe';

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToNotifications(): void {
    if (!this.swPush.isEnabled) {
      console.error('Service Worker or Push Notifications are not enabled in this browser.');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((subscription) => {
        console.log('Push subscription:', subscription);

        this.http.post(this.SUBSCRIPTION_URL, subscription).subscribe({
          next: () => console.log('Subscription saved successfully'),
          error: (err) => console.error('Failed to save subscription:', err),
        });
      })
      .catch((err) => {
        console.error('Failed to subscribe to notifications:', err);
      });
  }
}
