// Firebase 配置文件

// 初始化 Firebase
document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCQlz8H8h92hNDEaSm6Lg6_4xRzIC_iBxI",
        authDomain: "daycount-vietnam.firebaseapp.com",
        databaseURL: "https://daycount-vietnam-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "daycount-vietnam",
        storageBucket: "daycount-vietnam.appspot.com",
        messagingSenderId: "1082275680753",
        appId: "1:1082275680753:web:2f5e8a7b5c8d9a8f4e6c3b"
    };

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    } catch (error) {
        console.error('Firebase 初始化失败:', error);
    }
});
