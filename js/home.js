let log = console.log;
let tarefa = document.querySelector("#tarefa");
let validaTarefa = false;

let dataInicio = document.querySelector("#dataInicio");
let validaDataInit = false;

let dataTermino = document.querySelector("#dataTermino");
let validaDataFim = false;

let horaInit = document.querySelector("#horaInit");
let validaHoraInit = false;

let horaFim = document.querySelector("#horaFim");
let validaHoraFim = false;

let descricao = document.querySelector("#descricao");
let validaDescricao = false;

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
  //localStorage.removeItem("userLogado");
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
      inicio: `${dataInicio.value} às ${horaInit.value}`,
      fim: `${dataTermino.value} às${horaFim.value}`,
      status: "Em andamento",
      descricao: descricao.value,
    });

    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));

    //let tabela = document.textContent("#tabelaDados");
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

        novaLinha.insertCell().appendChild(document.createTextNode(tarefa.id));
        novaLinha
          .insertCell()
          .appendChild(document.createTextNode(tarefa.tarefa));
        novaLinha
          .insertCell()
          .appendChild(document.createTextNode(tarefa.inicio));
        novaLinha.insertCell().appendChild(document.createTextNode(tarefa.fim));
        novaLinha
          .insertCell()
          .appendChild(document.createTextNode(tarefa.status));
      });
    } else {
      console.log("Não há tarefas para exibir para este usuário.");
    }
  } else {
    console.log("Usuário não está logado ou não há dados no local storage.");
  }
}

window.onload = exibirTabela;
