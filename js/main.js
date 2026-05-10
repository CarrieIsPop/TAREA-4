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
const editPostIdInput = document.getElementById('edit-post-id');
const submitBtn = document.getElementById('submit-post-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

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
        
        const isAuthor = currentUser.username === post.author;
        const actionButtons = isAuthor ? `
            <div class="post-actions">
                <button class="btn-edit" onclick="editPost('${post.id}')">Editar</button>
                <button class="btn-delete" onclick="deletePost('${post.id}')">Eliminar</button>
            </div>
        ` : '';

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <small>Por: <strong>${post.author}</strong> | Fecha: ${post.date}</small>
            <p>${post.content}</p>
            ${actionButtons}
            <hr>
        `;
        postsContainer.appendChild(postElement);
    });
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const editId = editPostIdInput.value;

    if (editId) {
        const postIndex = posts.findIndex(p => p.id === editId);
        if (postIndex !== -1) {
            posts[postIndex].title = titleInput.value;
            posts[postIndex].content = contentInput.value;
        }
        cancelEditMode();
    } else {
        const newPost = {
            id: Date.now().toString(), 
            title: titleInput.value,
            content: contentInput.value,
            author: currentUser.username,
            date: new Date().toLocaleDateString()
        };
        posts.push(newPost);
    }

    localStorage.setItem('posts', JSON.stringify(posts));
    postForm.reset();
    renderPosts();
});

window.deletePost = function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
    }
}

window.editPost = function(id) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = posts.find(post => post.id === id);

    if (postToEdit) {
        titleInput.value = postToEdit.title;
        contentInput.value = postToEdit.content;
        editPostIdInput.value = postToEdit.id;
        
        submitBtn.textContent = 'Actualizar Publicación';
        cancelEditBtn.style.display = 'inline-block';
        window.scrollTo(0, 0);
    }
}

function cancelEditMode() {
    postForm.reset();
    editPostIdInput.value = '';
    submitBtn.textContent = 'Publicar';
    cancelEditBtn.style.display = 'none';
}

cancelEditBtn.addEventListener('click', cancelEditMode);

renderPosts();