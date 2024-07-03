const API_URL = 'https://api.dd99.top';

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            showProtectedContent();
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function showProtectedContent() {
    document.getElementById('auth-form').style.display = 'none';
    document.getElementById('protected-content').style.display = 'block';
    fetchProtectedContent();
}

function fetchProtectedContent() {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/protected`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
    })
    .catch(error => console.error('Error:', error));
}

function logout() {
    localStorage.removeItem('token');
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('protected-content').style.display = 'none';
}

// 检查是否已登录
if (localStorage.getItem('token')) {
    showProtectedContent();
}