import { Request, Response } from 'express';
import webPush from 'web-push';

//const vapidKeys = webPush.generateVAPIDKeys();
//console.log('VAPID Keys:', vapidKeys);

const vapidKeysPublic = "BJHYga7RKI0ys4RN8JmRwJFprQvdTm9drDI4Xyw5DSVF-a3a98zoXXTKLBBM0_ADVxHgiK7JT7FwKDsieiznnTs";
const vapidKeysPrivate = "wUKugteF-Q6uZwd0-xHvzagfAp3sgep88rszBckdHJg";

webPush.setVapidDetails(
  'mailto:example@yourdomain.org', //Przykladowy mail - takie sa wymogi (?)
  vapidKeysPublic,
  vapidKeysPrivate
);

let subscriptions = [];

export const subscribe = (req: Request, res: Response) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subskrypcja zapisana' });
};

export const sendNotification = (req: Request, res: Response) => {
  const notificationPayload = req.body;

  const promises = subscriptions.map(subscription => {
    return webPush.sendNotification(subscription, JSON.stringify(notificationPayload));
  });

  Promise.all(promises)
    .then(() => res.status(200).json({ message: 'Powiadomienie wysłane' }))
    .catch(err => res.status(500).json({ error: err.message }));
};
