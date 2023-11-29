let log = console.log;
let tarefa = document.querySelector("#tarefa");

let dataInicio = document.querySelector("#dataInicio");

let dataTermino = document.querySelector("#dataTermino");

let horaInit = document.querySelector("#horaInit");

let horaFim = document.querySelector("#horaFim");

let descricao = document.querySelector("#descricao");
let paragrafoModal = document.querySelector("#paragrafoModal");
let modalTitle = document.querySelector("#modal-title");

let user = JSON.parse(localStorage.getItem("userLogado"));
let nome = user.nome.split(" ");

let teste = document.querySelector("#teste");

let dados = {
  tarefa: "",
  inicio: "",
  fim: "",
  horaInit: "",
  horaFim: "",
  descricao: "",
  status: "",
};
let novaCelula;
let novaLinha;
let tabela;

teste.textContent = `Olá, ${nome[0]}`;

tarefa.addEventListener("keyup", () => {
  if (tarefa.value.length == "") {
    alert("gay");
    validaTarefa = false;
  } else {
    validaTarefa = true;
  }
});

function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "http://127.0.0.1:5500/html/index.html";
}
if (localStorage.getItem("token") == null) {
  window.location.href = "http://127.0.0.1:5500/html/index.html";
}

function criar() {
  if (
    tarefa.value == "" ||
    dataInicio.value === "" ||
    dataTermino.value === "" ||
    horaInit.value === "" ||
    dataTermino.value === "" ||
    descricao.value === ""
  ) {
    alert("preencha todos os campos");
  } else {
    let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas") || "[]");
    let id = JSON.parse(localStorage.getItem("userLogado"));

    listaTarefas.push({
      id: id.id,
      tarefa: tarefa.value,
      inicio: `${dataInicio.value}T${horaInit.value}`,
      fim: `${dataTermino.value}T${horaFim.value}`,
      status: "",
      descricao: descricao.value,
    });

    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  }

  window.location.reload();
}

function exibirTabela() {
  let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
  let userLogado = JSON.parse(localStorage.getItem("userLogado"));

  if (userLogado && listaTarefas) {
    let tarefasUsuario = listaTarefas.filter(
      (tarefa) => tarefa.id === userLogado.id
    );

    if (tarefasUsuario.length > 0) {
      let tabela = document
        .getElementById("tabelaDados")
        .getElementsByTagName("tbody")[0];

      tabela.innerHTML = "";

      tarefasUsuario.forEach(function (tarefa) {
        let novaLinha = tabela.insertRow(tabela.rows.length);

        // novaLinha.insertCell().appendChild(document.createTextNode(tarefa.id));
        novaLinha;
        // .insertCell()
        // .appendChild(document.createTextNode(tarefa.tarefa));
        let cellTarefa = novaLinha.insertCell();
        let teste = document.createElement("td");
        teste.textContent = tarefa.tarefa;

        teste.addEventListener("click", function () {
          new bootstrap.Modal("#modal").show();
          paragrafoModal.textContent = tarefa.descricao;
          modalTitle.textContent = tarefa.tarefa;
        });
        cellTarefa.appendChild(teste);
        // cellTarefa.textContent = tarefa.tarefa;

        novaLinha
          .insertCell()
          .appendChild(
            document.createTextNode(
              dayjs(tarefa.inicio).format("DD/MM/YYYY HH:mm")
            )
          );
        novaLinha
          .insertCell()
          .appendChild(
            document.createTextNode(
              dayjs(tarefa.fim).format("DD/MM/YYYY HH:mm")
            )
          );
        novaLinha;

        let statusCell = novaLinha.insertCell();
        let statusText = document.createTextNode(obterStatus(tarefa));

        statusCell.appendChild(statusText);
        let cellAlterar = novaLinha.insertCell();
        let buttonAlterar = document.createElement("input");
        buttonAlterar.type = "button";
        buttonAlterar.value = "Alterar";
        buttonAlterar.className = "btn btn-warning form-control-lg";

        buttonAlterar.addEventListener("click", function () {
          // Lógica a ser executada ao clicar no botão "Alterar"
          console.log(
            "Botão 'Alterar' clicado para a tarefa com ID: " + tarefa.id
          );
        });

        cellAlterar.appendChild(buttonAlterar);
      });
    } else {
      console.log("Não há tarefas para exibir para este usuário.");
    }
  } else {
    console.log("Usuário não está logado ou não há dados no local storage.");
  }
}

function obterStatus(tarefa) {
  const dataAtual = new Date();
  const dataFim = new Date(tarefa.fim);
  log(dataFim);
  const dataDif = (dataFim - dataAtual) / (1000 * 60 * 60 * 24);

  if (dataFim > dataAtual && dataDif < 1) {
    return "Pendente";
  } else if (dataFim > dataAtual) {
    return "Em andamento";
  } else if (tarefa.status === "Realizada") {
    return "Realizada";
  } else {
    return "Em Atraso";
  }
}

window.onload = exibirTabela;
