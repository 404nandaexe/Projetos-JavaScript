function atualizarTudo() {
    const agora = new Date()

    // Elementos do DOM
    const elementoHora = document.getElementById('hora')
    const elementoData = document.getElementById('data')
    const elementoMsg = document.getElementById('msg')
    const telaArcade = document.getElementById('telaArcade')

    // Hora formatada
    let hora = String(agora.getHours()).padStart(2, '0')
    let minutos = String(agora.getMinutes()).padStart(2, '0')
    let segundos = String(agora.getSeconds()).padStart(2, '0')

    let time = `${hora}:${minutos}:${segundos}`

    // Data formatada
    let dia = String(agora.getDate()).padStart(2, '0')
    let mes = String(agora.getMonth() + 1).padStart(2, '0')
    let ano = agora.getFullYear()

    let date = `${dia}/${mes}/${ano}`

    // Definição da Mensagem e controle do clima (Dia/Noite)
    let horaNumero = agora.getHours();
    let mensagem = "";

    // Reset de classes climáticas
    telaArcade.classList.remove('is-day', 'is-night');

    if (horaNumero >= 6 && horaNumero <= 11) {
        mensagem = "Bom dia!";
        telaArcade.classList.add('is-day');
    } else if (horaNumero >= 12 && horaNumero <= 17) {
        mensagem = "Boa tarde!";
        telaArcade.classList.add('is-day');
    } else if (horaNumero >= 18 && horaNumero <= 23) {
        mensagem = "Boa noite!";
        telaArcade.classList.add('is-night');
    } else {
        mensagem = "Boa madrugada!";
        telaArcade.classList.add('is-night');
    }

    // Atualizar o DOM com os valores corretos
    elementoHora.innerHTML = time;
    elementoData.innerHTML = date;
    elementoMsg.innerHTML = mensagem;
}

// Execução inicial imediata para evitar o delay de 1 segundo
atualizarTudo()
setInterval(atualizarTudo, 1000)