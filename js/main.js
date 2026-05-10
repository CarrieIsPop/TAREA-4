const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = 'index.html';
} else {
    document.getElementById('user-greeting').textContent = `Hola, ${currentUser.username}`;
}

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});


const postForm = document.getElementById('post-form');
const postsContainer = document.getElementById('posts-container');
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');

function renderPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No hay publicaciones. ¡Escribe la primera!</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <small>Por: <strong>${post.author}</strong> | Fecha: ${post.date}</small>
            <p>${post.content}</p>
            <div class="post-actions">
                <button class="btn-edit" onclick="console.log('Editar post ${post.id}')">Editar</button>
                <button class="btn-delete" onclick="console.log('Eliminar post ${post.id}')">Eliminar</button>
            </div>
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newPost = {
        id: Date.now().toString(),
        title: titleInput.value,
        content: contentInput.value,
        author: currentUser.username,
        date: new Date().toLocaleDateString()
    };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    postForm.reset();
    renderPosts();
});

renderPosts();