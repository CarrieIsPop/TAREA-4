document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(u => u.username === username);
    if (userExists) {
        alert("El usuario ya existe. Elige otro.");
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    document.getElementById('register-form').reset();
    document.getElementById('show-login').click(); // Volver al login
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const validUser = users.find(u => u.username === username && u.password === password);

    if (validUser) {
        localStorage.setItem('currentUser', JSON.stringify({ username: validUser.username }));
        alert("¡Bienvenido!");
        window.location.href = 'blog.html';
    } else {
        alert("Credenciales incorrectas.");
    }
});