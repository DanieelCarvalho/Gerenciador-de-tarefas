let log = console.log;
let criartarefa = document.querySelector("#tarefa");

let dataInicio = document.querySelector("#dataInicio");

let dataTermino = document.querySelector("#dataTermino");

let horaInit = document.querySelector("#horaInit");
let horaFim = document.querySelector("#horaFim");
let descricao = document.querySelector("#descricao");
let paragrafoModal = document.querySelector("#paragrafoModal");
let modalTitle = document.querySelector("#modal-title");
let cor = document.querySelectorAll(".status");

let user = JSON.parse(localStorage.getItem("userLogado"));
let nome = user.nome.split(" ");

let buttonCriarTarefa = document.querySelector(".buttonCriarTarefa");
let buttonALterarTarefa = document.querySelector(".buttonALterarTarefa");
let buttonExcluirTarefa = document.querySelector(".buttonExcluirTarefa");
let buttonTarefaRealizada = document.querySelector(".buttonTarefaRealizada");
let buttonCancelar = document.querySelector(".buttonCancelar");

let nomeUsuario = document.querySelector("#nomeUsuario");

let novaCelula;
let novaLinha;
let tabela;
let testeid = "";

nomeUsuario.textContent = `Olá, ${nome[0]}`;

tarefa.addEventListener("keyup", () => {
  if (tarefa.value.length == "") {
    alert("error");
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
function token() {
  if (localStorage.getItem("token") === null) {
    window.location.href = "http://127.0.0.1:5500/html/index.html";
  }
}
token();

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
      estaDeletado: false,
      usuarioId: id.id,
      idTarefas: listaTarefas.length + 1,
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
      (tarefa) => tarefa.usuarioId === userLogado.id && !tarefa.estaDeletado
    );
    if (tarefasUsuario.length > 0) {
      let tabela = document
        .getElementById("tabelaDados")
        .getElementsByTagName("tbody")[0];

      tabela.innerHTML = "";

      tarefasUsuario.forEach(function (tarefas) {
        let novaLinha = tabela.insertRow(tabela.rows.length);

        novaLinha;

        let cellTarefa = novaLinha.insertCell();
        let exibirModal = document.createElement("td");
        exibirModal.textContent = tarefas.tarefa;

        exibirModal.addEventListener("click", function () {
          new bootstrap.Modal("#modal").show();
          paragrafoModal.textContent = tarefas.descricao;
          modalTitle.textContent = tarefas.tarefa;
        });
        cellTarefa.appendChild(exibirModal);

        novaLinha
          .insertCell()
          .appendChild(
            document.createTextNode(
              dayjs(tarefas.inicio).format("DD/MM/YYYY HH:mm")
            )
          );
        novaLinha
          .insertCell()
          .appendChild(
            document.createTextNode(
              dayjs(tarefas.fim).format("DD/MM/YYYY HH:mm")
            )
          );
        novaLinha;

        let statusCell = novaLinha.insertCell();

        statusCell.className = "status";

        statusCell.appendChild(document.createTextNode(obterStatus(tarefas)));

        let cellAlterar = novaLinha.insertCell();
        let buttonAlterar = document.createElement("input");
        buttonAlterar.type = "button";
        buttonAlterar.value = "Alterar";
        buttonAlterar.className = "btn btn-warning form-control-lg";

        buttonAlterar.addEventListener("click", function () {
          alterar(tarefas);
          testeid = tarefas.idTarefas;
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
function mudarCor() {
  let status = document.getElementsByTagName("td");
  log(status);
}
mudarCor();
function obterStatus(tarefas) {
  const dataAtual = new Date();
  const dataFim = new Date(tarefas.fim);

  const dataDif = (dataFim - dataAtual) / (1000 * 60 * 60 * 24);
  if (tarefas.status === "Realizada") {
    return "Realizada";
  } else if (dataFim > dataAtual && dataDif < 1) {
    return "Pendente";
  } else if (dataFim > dataAtual) {
    return "andamento";
  } else {
    return "Em Atraso";
  }
}

function realizada() {
  let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));

  const tarefa = listaTarefas.find((t) => t.idTarefas === testeid);
  tarefa.style = "red";
  tarefa.status = "Realizada";
  listaTarefas = [
    ...listaTarefas.filter((t) => t.idTarefas !== testeid),
    tarefa,
  ];
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  window.location.reload();
}

function alterar(tarefas) {
  criartarefa.value = tarefas.tarefa;
  dataInicio.value = dayjs(tarefas.inicio.split("T")[0]).format("YYYY-MM-DD");
  horaInit.value = tarefas.inicio.split("T")[1];
  dataTermino.value = dayjs(tarefas.fim.split("T")[0]).format("YYYY-MM-DD");
  horaFim.value = tarefas.fim.split("T")[1];
  descricao.value = tarefas.descricao;
  buttonCriarTarefa.style.display = "none";
  buttonALterarTarefa.style.display = "flex";
  buttonExcluirTarefa.style.display = "flex";
  buttonTarefaRealizada.style.display = "flex";
  buttonCancelar.style.display = "flex";
}

function cancelar() {
  criartarefa.value = "";
  dataInicio.value = "";
  horaInit.value = "";
  dataTermino.value = "";
  horaFim.value = "";
  (descricao.value = ""), (buttonCriarTarefa.style.display = "flex");
  buttonALterarTarefa.style.display = "none";
  buttonExcluirTarefa.style.display = "none";
  buttonTarefaRealizada.style.display = "none";
  buttonCancelar.style.display = "none";
}

function excluir() {
  let listatarefas = JSON.parse(localStorage.getItem("listaTarefas"));

  listatarefas = listatarefas.map((index) => {
    if (index.idTarefas === testeid) {
      return {
        ...index,
        estaDeletado: true,
      };
    }
    return index;
  });
  localStorage.setItem("listaTarefas", JSON.stringify(listatarefas));
  window.location.reload();
}

function alterarTarefa() {
  let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
  const tarefas = listaTarefas.find((t) => t.idTarefas === testeid);
  tarefas.tarefa = tarefa.value;
  tarefas.fim = `${dataTermino.value}T${horaFim.value}`;
  tarefas.inicio = `${dataInicio.value}T${horaInit.value}`;
  tarefas.descricao = descricao.value;
  listaTarefas = [
    ...listaTarefas.filter((t) => t.idTarefas !== testeid),
    tarefas,
  ];
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
  window.location.reload();
}

window.onload = exibirTabela;
