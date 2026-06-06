const taskInput = document.getElementById('task-input');
const timeInput = document.getElementById('time-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// --- ATUALIZAR DATA, HORA E CALENDÁRIO ---
function updateDateTime() {
    const now = new Date();

    // Atualiza a Data (Ex: Ter, 18 Jan 2022)
    const dateOptions = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    let formattedDate = now.toLocaleDateString('pt-BR', dateOptions);
    document.getElementById('current-date').innerText = formattedDate.replace(/\./g, '');

    // Atualiza o Relógio Digital (Ex: 01:06:15 PM)
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('current-clock').innerText = now.toLocaleTimeString('en-US', timeOptions);
}

function setupCalendar() {
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 (Dom) a 6 (Sáb)

    const dayColumns = document.querySelectorAll('.day-col');
    
    dayColumns.forEach(col => {
        const targetDay = parseInt(col.getAttribute('data-day'));
        
        const diff = targetDay - currentDayOfWeek;
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + diff);

        col.querySelector('.day-number').innerText = targetDate.getDate();

        if (targetDay === currentDayOfWeek) {
            col.classList.add('active');
        }
    });
}

// Inicializadores do tempo
setInterval(updateDateTime, 1000);
updateDateTime();
setupCalendar();


// --- LÓGICA DA LISTA DE TAREFAS ---
function formatTime(timeValue) {
    // Retorna vazio/zerado se o usuário não escolher o horário
    if (!timeValue) return "--:--"; 
    
    const [hours, minutes] = timeValue.split(':');
    let period = "AM";
    let formattedHours = parseInt(hours);

    if (formattedHours >= 12) {
        period = "PM";
        if (formattedHours > 12) formattedHours -= 12;
    } else if (formattedHours === 0) {
        formattedHours = 12;
    }

    return `${String(formattedHours).padStart(2, '0')}:${minutes} ${period}`;
}

function addTask() {
    const taskText = taskInput.value.trim();
    const taskTime = timeInput.value;

    if (taskText === '') {
        alert('Por favor, insira uma tarefa!');
        return;
    }

    const formattedTime = formatTime(taskTime);

    const li = document.createElement('li');
    li.innerHTML = `
        <div class="task-card">
            <span class="checkbox"></span>
            <span class="task-text">${taskText}</span>
        </div>
        <div class="task-time">${formattedTime}</div>
        <button class="delete-btn">Excluir</button>
    `;

    const taskCard = li.querySelector('.task-card');
    taskCard.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
    });

    taskList.appendChild(li);

    // Limpa os campos
    taskInput.value = '';
    timeInput.value = '';
    taskInput.focus();
}

// Ouvintes de Eventos (Botão + e Tecla Enter)
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

timeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});