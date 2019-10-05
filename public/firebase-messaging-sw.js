importScripts('https://www.gstatic.com/firebasejs/3.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '779676974115',
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
