importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBQjBeiCMdEqlhwVpgHMwuxt9bZcRrsjKs",
    authDomain: "asgmt-9627a.firebaseapp.com",
    projectId: "asgmt-9627a",
    storageBucket: "asgmt-9627a.appspot.com",
    messagingSenderId: "918411655730",
    appId: "1:918411655730:web:bb840f0d41fb55cac89a2b"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Background Message from html';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});