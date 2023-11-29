let log = console.log;
let nome = document.querySelector("#nome");
let labelNome = document.querySelector("#labelNome");
let validNome = false;

let emailCadastro = document.querySelector("#emailCadastro");
let labelEmailC = document.querySelector("#labelEmailC");
let validEmail = false;

let senhaCadastro = document.querySelector("#senhaCadastro");
let labelSenhaC = document.querySelector("#labelSenhaC");
let validSenha = false;

let emailLogin = document.querySelector("#emailLogin");
let senhaLogin = document.querySelector("#senhaLogin");
let listaUser = [];
let userValid = {
  email: "",
  senha: "",
};
let dados = {
  tarefa: "",
  inicio: "",
  fim: "",
  horaInit: "",
  horaFim: "",
  descricao: "",
  status: "",
};

nome.addEventListener("keyup", () => {
  if (nome.value.length < 2) {
    validNome = false;
  } else {
    validNome = true;
  }
});

emailCadastro.addEventListener("keyup", () => {
  if (nome.value.length === "") {
    validEmail = false;
  } else {
    validEmail = true;
  }
});
senhaCadastro.addEventListener("keyup", () => {
  if (senhaCadastro.value.length < 7) {
    senhaCadastro.placeholder = "insira mais de 7 caracteres";
    validSenha = false;
  } else {
    validSenha = true;
  }
});

function cadastrar() {
  if (validNome && validEmail && validSenha) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");

    listaUser.push({
      id: listaUser.length + 1,
      nome: nome.value,
      email: emailCadastro.value,
      senha: senhaCadastro.value,
    });

    localStorage.setItem("listaUser", JSON.stringify(listaUser));
    log("deu bom");
    log(listaUser.length);
  } else {
    log("tudo vazio");
  }
}

function entrar() {
  listaUser = JSON.parse(localStorage.getItem("listaUser"));

  log(listaUser);

  listaUser.forEach((item) => {
    if (emailLogin.value == item.email && senhaLogin.value == item.senha) {
      dados = {
        tarefa: item.tarefa,
        inicio: dados.inicio,
        fim: dados.fim,
        status: dados.status,
      };
      userValid = {
        id: item.id,
        nome: item.nome,
        email: item.email,
        senha: item.senha,
      };
      log("deu bom");
    } else {
      log("deu ruim");
    }
  });
  if (emailLogin.value == "" || senhaLogin.value == "") {
    alert("preencha todos os campos");
  } else if (
    emailLogin.value === userValid.email &&
    senhaLogin.value === userValid.senha
  ) {
    window.location.href = "http://127.0.0.1:5500/html/signin.html";
    let token = Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);

    localStorage.setItem("userLogado", JSON.stringify(userValid));
    log(token);
  } else {
    $("#modalSenhaIncorreta").modal("show");
  }

  log(userValid);
}
