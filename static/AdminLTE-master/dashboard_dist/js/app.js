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

// https://stackoverflow.com/questions/57458721/allowed-for-notification-yet-permission-granted-returns-false 
// https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
// var notification = new Notification(title, options);

// function showNotification(notificationTitle, notificationOptions) {
    //    const notificationTitle = 'Background Message Title';
    //    const notificationOptions = {
    //      body: 'Background Message body.',
    //      icon: '/firebase-logo.png'
    //    };
    //    const notification = new Notification('Hello', {
    //        body: 'Foreground Notification Received!'
    //    });
// };



// from galactic group on slack

// var SubscribeUser = document.getElementById("SubscribeUser");
var SubscribeUser = document.getElementById("reg_id");
SubscribeUser.addEventListener("click", function () {
    console.log('SubscribeButton clicked ');
    if (Notification.permission === 'granted') {   //* here the check for the 3 levels 
        console.log('You have permission granted ');
        $.ajax({
            type: "GET",
            url: "" ,
            data: {
                "permission": Notification.permission,
            },
            dataType: "json",
        });
        
    } else if (Notification.permission === 'default') {
        navigator.serviceWorker.register('/static/AdminLTE-master/dashboard_dist/js/firebase-messaging-sw.js').then((registration) => {
            messaging.useServiceWorker(registration);
            messaging.requestPermission().then(function () {
                console.log('granted');
                return messaging.getToken();
            }).then(currentToken => {
                $.ajax({
                    type: "GET",
                    url: "" ,     //* To be suitable for every URL in our site
                    data: {
                        "result": currentToken,
                    },
                    dataType: "json",
                    // success: function (data) {
                    //     // any process in data
                    //     alert("successfull")
                    //     console.log('successful')
                    // },
                    // failure: function () {
                    //     alert("failure");
                    // }
                });
                // fetch("http://127.0.0.1:8000/notification/devices", {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         name: "test",
                //         registration_id: currentToken,
                //         device_id: "test device",
                //         active: true,
                //         type: "web"
                //     }),
                //     headers: {
                //         "Content-Type": "application/json; charset=UTF-8"
                //     }
                // }).then(function (response) {
                //     console.log(response.json, ' this is response.json file.... ')
                //     return response.json()
                // }).then(function (data) {
                //     console.log(data)
                // });
            }).catch(function (err) {
                console.log('Error ocurred');
            });
        });
    }else {
        console.log('Your permission is denied')
    }
});

// console.log('PERMISSION= ', Notification.permission);

messaging.onMessage((payload) => {
    var fcmFGPayload = payload || {}
    //    const notificationTitle = fcmFGPayload.notification.title;
    //    const notificationOptions = {
    //      body: fcmFGPayload.notification.body,
    //      icon: fcmFGPayload.notification.icon
    //    };
    //    showNotification();
    ////    self.registration.showNotification(notificationTitle,
    ////      notificationOptions);
    //    console.log(notificationTitle, notificationOptions)
    //* alert(fcmFGPayload.notification.body);
    //    alert(notificationTitle)
    //    alert(notificationOption)
    console.log('Message received. ', payload);
    // ...
});



//messaging.onBackgroundMessage(function(payload) {
//  console.log('[firebase-messaging-sw.js] Received background message ', payload);
//  // Customize notification here
//  const notificationTitle = 'Background Message Title';
//  const notificationOptions = {
//    body: 'Background Message body.',
//    icon: '/firebase-logo.png'
//  };
//
//  self.registration.showNotification(notificationTitle, notificationOptions);
//});

//    messaging.onMessage(function(payload) {
//        console.log('Hoorah'); // does not work :(
//    });
//    Notification.requestPermission().then(permission=>{
//        console.log(permission)
//        if(permission == "granted"){
//            messaging.getToken({vapidKey:"BI0-Jdkpg648ZcwIMw1A3ofosLVLsx1dCQV_OYEcF8Hm078A7R1mreUj7vevuBUOuhf2ICTAQI5pVBLvgGHH1Hg"}).then(currentToken=>{
//                console.log(currentToken)
//            })
//        }
//    })
//}, false);

//function IntitalizeFireBaseMessaging() {
//    messaging
//        .requestPermission()
//        .then(function () {
//            console.log("Notification Permission");
//            return messaging.getToken();
//        })
//        .then(function (token) {
//            console.log("Token : "+token);
//            document.getElementById("token").innerHTML=token;
//        })
//        .catch(function (reason) {
//            console.log(reason);
//        });
//}
//
//messaging.onMessage(function (payload) {
//    console.log(payload);
//    const notificationOption={
//        body:payload.notification.body,
//        icon:payload.notification.icon
//    };
//
//    if(Notification.permission==="granted"){
//        var notification=new Notification(payload.notification.title,notificationOption);
//
//        notification.onclick=function (ev) {
//            ev.preventDefault();
//            window.open(payload.notification.click_action,'_blank');
//            notification.close();
//        }
//    }
//
//});
//messaging.onTokenRefresh(function () {
//    messaging.getToken()
//        .then(function (newtoken) {
//            console.log("New Token : "+ newtoken);
//        })
//        .catch(function (reason) {
//            console.log(reason);
//        })
//})
//IntitalizeFireBaseMessaging();


///////////////////////////////////////////////////////////

//import  from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
// import * from "https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js"

//import firebase from "firebase/app";
//import "firebase/messaging";

//import ('https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js');
//import('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js');

//const firebaseConfig = {
//    apiKey: "AIzaSyB9tYwcyDT5pzrnPuogcdmQvRwCk_yMqGI",
//    authDomain: "galactic-shop-fb.firebaseapp.com",
//    projectId: "galactic-shop-fb",
//    storageBucket: "galactic-shop-fb.appspot.com",
//    messagingSenderId: "836624632962",
//    appId: "1:836624632962:web:7f3b4e7a9b8fb8478bb89b",
//    measurementId: "G-BX5QDDYZ18"
//};
//
//const app = initializeApp(firebaseConfig);
//
//const messaging = firebase.messaging()
//
//var SubscribeUser = document.getElementById("SubscribeUser");
//SubscribeUser.addEventListener("click", function() {
//    console.log('Working')
//    Notification.requestPermission().then(permission=>{
//        console.log(permission)
//    })
//}, false);

///////////////////////////////////////////////////////////////////////////////

//import firebase from "firebase/app";
//import "firebase/messaging";
//
//function getMessagingObject() {
//  // [START messaging_get_messaging_object]
//  const messaging = firebase.messaging();
//  // [END messaging_get_messaging_object]
//}
//
//function receiveMessage() {
//  const messaging = firebase.messaging();
//  // [START messaging_receive_message]
//  // Handle incoming messages. Called when:
//  // - a message is received while the app has focus
//  // - the user clicks on an app notification created by a service worker
//  //   `messaging.onBackgroundMessage` handler.
//  messaging.onMessage((payload) => {
//    console.log('Message received. ', payload);
//    // ...
//  });
//  // [END messaging_receive_message]
//}
//
//function getToken() {
//  const messaging = firebase.messaging();
//  // [START messaging_get_token]
//  // Get registration token. Initially this makes a network call, once retrieved
//  // subsequent calls to getToken will return from cache.
//  messaging.getToken({ vapidKey: '<YOUR_PUBLIC_VAPID_KEY_HERE>' }).then((currentToken) => {
//    if (currentToken) {
//      // Send the token to your server and update the UI if necessary
//      // ...
//    } else {
//      // Show permission request UI
//      console.log('No registration token available. Request permission to generate one.');
//      // ...
//    }
//  }).catch((err) => {
//    console.log('An error occurred while retrieving token. ', err);
//    // ...
//  });
//  // [END messaging_get_token]
//}
//
//function requestPermission() {
//  // [START messaging_request_permission]
//  Notification.requestPermission().then((permission) => {
//    if (permission === 'granted') {
//      console.log('Notification permission granted.');
//      // TODO(developer): Retrieve a registration token for use with FCM.
//      // ...
//    } else {
//      console.log('Unable to get permission to notify.');
//    }
//  });
//  // [END messaging_request_permission]
//}
//
//function deleteToken() {
//  const messaging = firebase.messaging();
//
//  // [START messaging_delete_token]
//  messaging.deleteToken().then(() => {
//    console.log('Token deleted.');
//    // ...
//  }).catch((err) => {
//    console.log('Unable to delete token. ', err);
//  });
//  // [END messaging_delete_token]
//}


//messaging.onBackgroundMessage(function(payload) {
//  console.log('[firebase-messaging-sw.js] Received background message ', payload);
//  // Customize notification here
//  const notificationTitle = 'Background Message Title';
//  const notificationOptions = {
//    body: 'Background Message body.',
//    icon: '/firebase-logo.png'
//  };
//
//  self.registration.showNotification(notificationTitle, notificationOptions);
//});

//    messaging.onMessage(function(payload) {
//        console.log('Hoorah'); // does not work :(
//    });
//    Notification.requestPermission().then(permission=>{
//        console.log(permission)
//        if(permission == "granted"){
//            messaging.getToken({vapidKey:"BI0-Jdkpg648ZcwIMw1A3ofosLVLsx1dCQV_OYEcF8Hm078A7R1mreUj7vevuBUOuhf2ICTAQI5pVBLvgGHH1Hg"}).then(currentToken=>{
//                console.log(currentToken)
//            })
//        }
//    })
//}, false);

//function IntitalizeFireBaseMessaging() {
//    messaging
//        .requestPermission()
//        .then(function () {
//            console.log("Notification Permission");
//            return messaging.getToken();
//        })
//        .then(function (token) {
//            console.log("Token : "+token);
//            document.getElementById("token").innerHTML=token;
//        })
//        .catch(function (reason) {
//            console.log(reason);
//        });
//}
//
//messaging.onMessage(function (payload) {
//    console.log(payload);
//    const notificationOption={
//        body:payload.notification.body,
//        icon:payload.notification.icon
//    };
//
//    if(Notification.permission==="granted"){
//        var notification=new Notification(payload.notification.title,notificationOption);
//
//        notification.onclick=function (ev) {
//            ev.preventDefault();
//            window.open(payload.notification.click_action,'_blank');
//            notification.close();
//        }
//    }
//
//});
//messaging.onTokenRefresh(function () {
//    messaging.getToken()
//        .then(function (newtoken) {
//            console.log("New Token : "+ newtoken);
//        })
//        .catch(function (reason) {
//            console.log(reason);
//        })
//})
//IntitalizeFireBaseMessaging();


///////////////////////////////////////////////////////////

//import  from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
////import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
//import * from "https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js"

//import firebase from "firebase/app";
//import "firebase/messaging";

//import ('https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js');
//import('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js');

//const firebaseConfig = {
//    apiKey: "AIzaSyB9tYwcyDT5pzrnPuogcdmQvRwCk_yMqGI",
//    authDomain: "galactic-shop-fb.firebaseapp.com",
//    projectId: "galactic-shop-fb",
//    storageBucket: "galactic-shop-fb.appspot.com",
//    messagingSenderId: "836624632962",
//    appId: "1:836624632962:web:7f3b4e7a9b8fb8478bb89b",
//    measurementId: "G-BX5QDDYZ18"
//};
//
//const app = initializeApp(firebaseConfig);
//
//const messaging = firebase.messaging()
//
//var SubscribeUser = document.getElementById("SubscribeUser");
//SubscribeUser.addEventListener("click", function() {
//    console.log('Working')
//    Notification.requestPermission().then(permission=>{
//        console.log(permission)
//    })
//}, false);

///////////////////////////////////////////////////////////////////////////////

//import firebase from "firebase/app";
//import "firebase/messaging";
//
//function getMessagingObject() {
//  // [START messaging_get_messaging_object]
//  const messaging = firebase.messaging();
//  // [END messaging_get_messaging_object]
//}
//
//function receiveMessage() {
//  const messaging = firebase.messaging();
//  // [START messaging_receive_message]
//  // Handle incoming messages. Called when:
//  // - a message is received while the app has focus
//  // - the user clicks on an app notification created by a service worker
//  //   `messaging.onBackgroundMessage` handler.
//  messaging.onMessage((payload) => {
//    console.log('Message received. ', payload);
//    // ...
//  });
//  // [END messaging_receive_message]
//}
//
//function getToken() {
//  const messaging = firebase.messaging();
//  // [START messaging_get_token]
//  // Get registration token. Initially this makes a network call, once retrieved
//  // subsequent calls to getToken will return from cache.
//  messaging.getToken({ vapidKey: '<YOUR_PUBLIC_VAPID_KEY_HERE>' }).then((currentToken) => {
//    if (currentToken) {
//      // Send the token to your server and update the UI if necessary
//      // ...
//    } else {
//      // Show permission request UI
//      console.log('No registration token available. Request permission to generate one.');
//      // ...
//    }
//  }).catch((err) => {
//    console.log('An error occurred while retrieving token. ', err);
//    // ...
//  });
//  // [END messaging_get_token]
//}
//
//function requestPermission() {
//  // [START messaging_request_permission]
//  Notification.requestPermission().then((permission) => {
//    if (permission === 'granted') {
//      console.log('Notification permission granted.');
//      // TODO(developer): Retrieve a registration token for use with FCM.
//      // ...
//    } else {
//      console.log('Unable to get permission to notify.');
//    }
//  });
//  // [END messaging_request_permission]
//}
//
//function deleteToken() {
//  const messaging = firebase.messaging();
//
//  // [START messaging_delete_token]
//  messaging.deleteToken().then(() => {
//    console.log('Token deleted.');
//    // ...
//  }).catch((err) => {
//    console.log('Unable to delete token. ', err);
//  });
//  // [END messaging_delete_token]
//}