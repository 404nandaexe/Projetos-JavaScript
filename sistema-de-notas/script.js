const tabelaAlunos = document.getElementById("tabelaAlunos");
const nomeAluno = document.getElementById("nomeAluno");
const btnAdicionar = document.getElementById("btnAdicionar");

let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

btnAdicionar.addEventListener("click", adicionarAluno);

nomeAluno.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        adicionarAluno();
    }
});

function salvarDados() {
    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );
}

function calcularMedia(aluno) {

    const soma =
        Number(aluno.n1) +
        Number(aluno.n2) +
        Number(aluno.n3) +
        Number(aluno.n4);

    return (soma / 4).toFixed(1);
}

function adicionarAluno() {

    const nome = nomeAluno.value.trim();

    if (!nome) {
        alert("Digite o nome do aluno.");
        return;
    }

    alunos.push({
        nome,
        n1: 0,
        n2: 0,
        n3: 0,
        n4: 0
    });

    salvarDados();
    renderizarTabela();

    nomeAluno.value = "";
    nomeAluno.focus();
}

function atualizarNota(indice, campo, valor) {

    let nota = Number(valor);

    if (isNaN(nota)) nota = 0;
    if (nota < 0) nota = 0;
    if (nota > 10) nota = 10;

    alunos[indice][campo] = nota;

    salvarDados();
    renderizarTabela();
}

function excluirAluno(indice) {

    const confirmar = confirm(
        `Deseja excluir ${alunos[indice].nome}?`
    );

    if (!confirmar) return;

    alunos.splice(indice, 1);

    salvarDados();
    renderizarTabela();
}

function renderizarTabela() {

    tabelaAlunos.innerHTML = "";

    alunos.forEach((aluno, indice) => {

        const media = calcularMedia(aluno);

        const situacao =
            media >= 7
                ? "Aprovado"
                : "Reprovado";

        const classeSituacao =
            media >= 7
                ? "status-aprovado"
                : "status-reprovado";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${aluno.nome}</td>

            <td>
                <input
                    class="nota"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value="${aluno.n1}"
                >
            </td>

            <td>
                <input
                    class="nota"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value="${aluno.n2}"
                >
            </td>

            <td>
                <input
                    class="nota"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value="${aluno.n3}"
                >
            </td>

            <td>
                <input
                    class="nota"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value="${aluno.n4}"
                >
            </td>

            <td>
                <strong>${media}</strong>
            </td>

            <td class="${classeSituacao}">
                ${situacao}
            </td>

            <td>
                <button class="btnExcluir">
                    Excluir
                </button>
            </td>
        `;

        const inputs = linha.querySelectorAll(".nota");

        const campos = [
            "n1",
            "n2",
            "n3",
            "n4"
        ];

        inputs.forEach((input, i) => {

            input.addEventListener(
                "change",
                () => {

                    atualizarNota(
                        indice,
                        campos[i],
                        input.value
                    );

                }
            );
        });

        linha
            .querySelector(".btnExcluir")
            .addEventListener(
                "click",
                () => excluirAluno(indice)
            );

        tabelaAlunos.appendChild(linha);

    });
}

renderizarTabela();