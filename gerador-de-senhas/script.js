const passwordField = document.getElementById('passwordField');
const toggleBtn = document.getElementById('toggleBtn');
const characterFace = document.getElementById('characterFace');
const strengthBar = document.getElementById('strengthBar');
const lengthSlider = document.getElementById('lengthSlider');
const lengthLabel = document.getElementById('lengthLabel');
const generateBtn = document.getElementById('generateBtn');


// Atualiza label do slider
lengthSlider.addEventListener('input', (e) => {
    lengthLabel.innerText =
        `Tamanho: ${e.target.value} caracteres`;
});


// Mostrar e esconder senha
toggleBtn.addEventListener('click', () => {

    if (passwordField.type === 'password') {

        passwordField.type = 'text';
        toggleBtn.innerText = 'ESCONDER';

        characterFace.classList.add(
            'looking-at-password'
        );

    } else {

        passwordField.type = 'password';
        toggleBtn.innerText = 'VER';

        characterFace.classList.remove(
            'looking-at-password'
        );
    }

});


// Atualizar barra de força
function updateStrength(password) {

    strengthBar.className = 'strength-bar';

    if (password.length === 0) {
        return;
    }

    if (password.length <= 7) {

        strengthBar.classList.add('weak');

    } else if (password.length <= 13) {

        strengthBar.classList.add('medium');

    } else {

        strengthBar.classList.add('strong');

    }
}


// Detectar digitação do usuário
passwordField.addEventListener('input', () => {
    updateStrength(passwordField.value);
});


// Gerar senha
function generatePassword() {

    const length = Number(lengthSlider.value);

    let charset = '';

    if (length <= 7) {

        charset =
            'abcdefghijklmnopqrstuvwxyz';

    } else if (length <= 13) {

        charset =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    } else {

        charset =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    }

    let password = '';

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * charset.length
            );

        password += charset[randomIndex];
    }

    passwordField.value = password;

    updateStrength(password);
}


// Botão gerar
generateBtn.addEventListener(
    'click',
    generatePassword
);