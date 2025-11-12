// Configura URL do backend.
// Se houver variável global BACKEND_URL (injetada no HTML), usa ela; caso contrário, tenta rota relativa
// Útil quando frontend e backend estão em hosts diferentes (Vercel + Render/Railway)
const BACKEND_URL = window.BACKEND_URL || '';
const API_URL = (BACKEND_URL ? BACKEND_URL.replace(/\/$/, '') : '') + '/api/users';

// Elementos do DOM
const userForm = document.getElementById('userForm');
const usersList = document.getElementById('usersList');
const messageDiv = document.getElementById('message');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const userIdInput = document.getElementById('userId');

// Estado da aplicação
let isEditing = false;

// Carregar usuários ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

// Submeter formulário
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('dataNascimento').value || undefined
    };

    if (isEditing) {
        await updateUser(userIdInput.value, formData);
    } else {
        await createUser(formData);
    }
});

// Cancelar edição
cancelBtn.addEventListener('click', () => {
    resetForm();
});

// Criar usuário
async function createUser(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showMessage('success', result.message);
            userForm.reset();
            loadUsers();
        } else {
            showMessage('error', result.message);
        }
    } catch (error) {
        showMessage('error', 'Erro ao cadastrar usuário. Verifique se o servidor está rodando.');
        console.error('Erro:', error);
    }
}

// Carregar usuários
async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success) {
            displayUsers(result.data);
        } else {
            usersList.innerHTML = '<p class="error">Erro ao carregar usuários</p>';
        }
    } catch (error) {
        usersList.innerHTML = '<p class="error">Erro ao conectar com o servidor</p>';
        console.error('Erro:', error);
    }
}

// Exibir usuários
function displayUsers(users) {
    if (users.length === 0) {
        usersList.innerHTML = `
            <div class="empty-state">
                <p>📭 Nenhum usuário cadastrado</p>
                <p style="font-size: 0.9rem;">Comece cadastrando um novo usuário acima!</p>
            </div>
        `;
        return;
    }

    usersList.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-info">
                <h3>${user.nome}</h3>
                <p><strong>📧 Email:</strong> ${user.email}</p>
                <p><strong>📱 Telefone:</strong> ${user.telefone}</p>
                ${user.dataNascimento ? `<p><strong>🎂 Data de Nascimento:</strong> ${formatDate(user.dataNascimento)}</p>` : ''}
                <p><strong>📅 Cadastrado em:</strong> ${formatDate(user.createdAt)}</p>
            </div>
            <div class="user-actions">
                <button class="btn btn-edit" onclick="editUser('${user._id}')">
                    <span>✏️</span> Editar
                </button>
                <button class="btn btn-delete" onclick="deleteUser('${user._id}')">
                    <span>🗑️</span> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// Editar usuário
async function editUser(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();

        if (result.success) {
            const user = result.data;
            
            // Preencher formulário
            userIdInput.value = user._id;
            document.getElementById('nome').value = user.nome;
            document.getElementById('email').value = user.email;
            document.getElementById('telefone').value = user.telefone;
            
            if (user.dataNascimento) {
                document.getElementById('dataNascimento').value = user.dataNascimento.split('T')[0];
            }

            // Alterar estado para edição
            isEditing = true;
            formTitle.textContent = 'Editar Usuário';
            submitBtn.innerHTML = '<span>✓</span> Atualizar';
            cancelBtn.style.display = 'block';

            // Scroll para o formulário
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        showMessage('error', 'Erro ao carregar dados do usuário');
        console.error('Erro:', error);
    }
}

// Atualizar usuário
async function updateUser(id, data) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showMessage('success', result.message);
            resetForm();
            loadUsers();
        } else {
            showMessage('error', result.message);
        }
    } catch (error) {
        showMessage('error', 'Erro ao atualizar usuário');
        console.error('Erro:', error);
    }
}

// Deletar usuário
async function deleteUser(id) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            showMessage('success', result.message);
            loadUsers();
        } else {
            showMessage('error', result.message);
        }
    } catch (error) {
        showMessage('error', 'Erro ao excluir usuário');
        console.error('Erro:', error);
    }
}

// Resetar formulário
function resetForm() {
    userForm.reset();
    userIdInput.value = '';
    isEditing = false;
    formTitle.textContent = 'Cadastrar Novo Usuário';
    submitBtn.innerHTML = '<span>✓</span> Cadastrar';
    cancelBtn.style.display = 'none';
}

// Mostrar mensagem
function showMessage(type, text) {
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}
