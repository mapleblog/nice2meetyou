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
                playLoginTransition('index.html');
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

    function playLoginTransition(dest) {
        var heartEl  = document.getElementById('loginHeartIcon');
        var fillEl   = document.getElementById('loginFillCircle');
        var rings    = document.querySelectorAll('.login-ring');
        var overlay  = document.getElementById('loginTransitionOverlay');

        // Make overlay capture pointer events during animation
        overlay.style.pointerEvents = 'all';

        // 1. Heart pops at center
        heartEl.style.transition = 'transform 0.35s cubic-bezier(0.17,0.67,0.4,1.3), opacity 0.2s';
        heartEl.style.opacity = '1';
        heartEl.style.transform = 'translate(-50%, -50%) scale(1)';

        // 2. Rings expand
        rings.forEach(function(r) { r.classList.add('fire'); });

        // 3. Fill circle blooms out and covers the screen
        setTimeout(function() {
            fillEl.style.transition = 'transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.05s';
            fillEl.style.opacity = '1';
            fillEl.style.transform = 'translate(-50%,-50%) scale(40)';
        }, 280);

        // 4. Navigate once fill covers screen
        setTimeout(function() {
            window.location.href = dest;
        }, 980);
    }
});
