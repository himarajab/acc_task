importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyB9tYwcyDT5pzrnPuogcdmQvRwCk_yMqGI",
    authDomain: "galactic-shop-fb.firebaseapp.com",
    projectId: "galactic-shop-fb",
    storageBucket: "galactic-shop-fb.appspot.com",
    messagingSenderId: "836624632962",
    appId: "1:836624632962:web:7f3b4e7a9b8fb8478bb89b",
    measurementId: "G-BX5QDDYZ18"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

function onBackgroundMessage() {
    const messaging = firebase.messaging();

    // [START messaging_on_background_message]
    messaging.setBackgroundMessageHandler((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        var fcmBGPayload = payload || {}
        const notificationTitle = 'Background Message Title';
        const notificationOptions = {
            body: 'Background Message body.',
            icon: '/firebase-logo.png'
        };

        self.registration.showNotification(notificationTitle,
            notificationOptions);
    });
    // [END messaging_on_background_message]
}

//messaging.onBackgroundMessage((payload) => {
//  console.log('[firebase-messaging-sw.js] Received background message ', payload);
//  const notificationTitle = 'Background Message Title';
//  const notificationOptions = {
//    body: 'Background Message body.',
//    icon: '/firebase-logo.png'
//  };
//  self.registration.showNotification(notificationTitle, notificationOptions);
//});


//messaging.setBackgroundMessageHandler(function (payload) {
//    console.log(payload);
//    const notification=JSON.parse(payload);
//    const notificationOption={
//        body:notification.body,
//        icon:notification.icon
//    };
//    return self.registration.showNotification(payload.notification.title,notificationOption);
//});