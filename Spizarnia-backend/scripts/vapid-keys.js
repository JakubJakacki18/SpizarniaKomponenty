
const webPush = require('web-push');


const vapidKeys = webPush.generateVAPIDKeys();


console.log('Publiczny klucz VAPID: ', vapidKeys.publicKey);
console.log('Prywatny klucz VAPID: ', vapidKeys.privateKey);
