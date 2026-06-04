document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // If already signed in, go straight to the app
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href = 'index.html';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            showError('请输入邮箱和密码');
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function() {
                window.location.href = 'index.html';
            })
            .catch(function() {
                showError('邮箱或密码错误，请重试');
            });
    });

    function showError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
        setTimeout(function() { loginError.style.display = 'none'; }, 3000);
    }
});
