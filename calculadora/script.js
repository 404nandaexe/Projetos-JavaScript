// =========================================
// SELEÇÃO DOS ELEMENTOS HTML
// =========================================

const result = document.getElementById('result');

const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');

const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');

// =========================================
// ESTADO DA CALCULADORA
// =========================================

let numeroAtual = '';
let numeroAnterior = '';
let operadorAtual = '';
let resultadoExibido = false;

// =========================================
// DISPLAY
// =========================================

function atualizarDisplay() {
    if (numeroAtual === '' && numeroAnterior === '') {
        result.innerText = '0';
        return;
    }

    if (operadorAtual === '') {
        result.innerText = numeroAtual || numeroAnterior;
        return;
    }

    result.innerText = `${numeroAnterior} ${operadorAtual} ${numeroAtual}`;
}

// =========================================
// CALCULAR
// =========================================

function calcular() {
    if (
        numeroAnterior === '' ||
        numeroAtual === '' ||
        operadorAtual === ''
    ) {
        return;
    }

    const num1 = parseFloat(numeroAnterior);
    const num2 = parseFloat(numeroAtual);

    let resultado;

    switch (operadorAtual) {
        case '+':
            resultado = num1 + num2;
            break;

        case '-':
            resultado = num1 - num2;
            break;

        case '×':
            resultado = num1 * num2;
            break;

        case '÷':
        case '/':
            if (num2 === 0) {
                result.innerText = 'Erro';
                numeroAtual = '';
                numeroAnterior = '';
                operadorAtual = '';
                return;
            }

            resultado = num1 / num2;
            break;

        case '%':
            resultado = num1 % num2;
            break;

        default:
            return;
    }

    numeroAtual = String(resultado);
    numeroAnterior = '';
    operadorAtual = '';

    resultadoExibido = true;

    atualizarDisplay();
}

// =========================================
// ADICIONAR NÚMERO
// =========================================

function adicionarNumero(valor) {
    if (resultadoExibido) {
        numeroAtual = '';
        resultadoExibido = false;
    }

    if (valor === '.' && numeroAtual.includes('.')) {
        return;
    }

    numeroAtual += valor;

    atualizarDisplay();
}

// =========================================
// DEFINIR OPERADOR
// =========================================

function definirOperador(op) {

    // Permite número negativo inicial
    if (
        numeroAtual === '' &&
        op === '-'
    ) {
        numeroAtual = '-';
        atualizarDisplay();
        return;
    }

    if (numeroAtual === '') {
        return;
    }

    // Operações encadeadas
    if (
        numeroAnterior !== '' &&
        operadorAtual !== ''
    ) {
        calcular();
    }

    numeroAnterior = numeroAtual;
    operadorAtual = op;
    numeroAtual = '';

    resultadoExibido = false;

    atualizarDisplay();
}

// =========================================
// BOTÕES NUMÉRICOS
// =========================================

for (const button of numbers) {
    button.addEventListener('click', () => {
        adicionarNumero(button.innerText);
    });
}

// =========================================
// BOTÕES OPERADORES
// =========================================

for (const button of operators) {
    button.addEventListener('click', () => {
        definirOperador(button.innerText);
    });
}

// =========================================
// IGUAL
// =========================================

equal.addEventListener('click', calcular);

// =========================================
// LIMPAR
// =========================================

clear.addEventListener('click', () => {

    numeroAtual = '';
    numeroAnterior = '';
    operadorAtual = '';
    resultadoExibido = false;

    atualizarDisplay();
});

// =========================================
// BACKSPACE
// =========================================

backspace.addEventListener('click', () => {

    if (resultadoExibido) {
        numeroAtual = '';
        resultadoExibido = false;
    } else {
        numeroAtual = numeroAtual.slice(0, -1);
    }

    atualizarDisplay();
});

// =========================================
// TECLADO
// =========================================

document.addEventListener('keydown', (event) => {

    const tecla = event.key;

    // Números
    if (/^[0-9]$/.test(tecla)) {
        adicionarNumero(tecla);
        return;
    }

    // Decimal
    if (tecla === '.') {
        adicionarNumero('.');
        return;
    }

    // Operadores
    if (
        tecla === '+' ||
        tecla === '-' ||
        tecla === '*' ||
        tecla === '/' ||
        tecla === '%'
    ) {

        const operador =
            tecla === '*'
                ? '×'
                : tecla === '/'
                ? '÷'
                : tecla;

        definirOperador(operador);
        return;
    }

    // Enter
    if (tecla === 'Enter' || tecla === '=') {
        calcular();
        return;
    }

    // Backspace
    if (tecla === 'Backspace') {
        event.preventDefault();
        backspace.click();
        return;
    }

    // Esc
    if (tecla === 'Escape') {
        clear.click();
    }
});

// =========================================
// INICIALIZAÇÃO
// =========================================

atualizarDisplay();