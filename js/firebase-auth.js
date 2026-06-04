document.addEventListener('DOMContentLoaded', function() {
    if (typeof firebase === 'undefined') return;

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.location.href = 'login_page.html';
        }
    });
});
