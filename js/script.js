let log = console.log;
let nome = document.querySelector("#nome");

let alertaCadastro = document.querySelector("#alertaCadastro");
let alertaLogin = document.querySelector("#alertaLogin");
let emailCadastro = document.querySelector("#emailCadastro");
let senhaCadastro = document.querySelector("#senhaCadastro");

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

function validarEmail() {
  if (emailCadastro.value === "") {
    return false;
    alertaCadastro.style.display = "block";
    alertaCadastro.className = "alert alert-danger";
    alertaCadastro.textContent = "Insira um e-mail";
  } else {
    alertaCadastro.style.display = "none";
    return true;
  }
}

function validarNome() {
  if (nome.value === "") {
    return false;
    alertaCadastro.style.display = "block";
    alertaCadastro.className = "alert alert-danger";
    alertaCadastro.textContent = "Insira um nome";
  } else {
    alertaCadastro.style.display = "none";
    return true;
  }
}

function validarSenha() {
  if (senhaCadastro.value.length < 7) {
    alertaCadastro.style.display = "block";
    alertaCadastro.className = "alert alert-danger";
    alertaCadastro.textContent = "Insira mais de 7 caracteres na senha.";
    return false;
  } else {
    alertaCadastro.style.display = "none";
    return true;
  }
}

function cadastrar() {
  let validEmail = validarEmail();
  let validNome = validarNome();
  let validSenha = validarSenha();
  if (validNome && validEmail && validSenha) {
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");
    const emailExistente = listaUser.some(
      (user) => user.email === emailCadastro.value
    );

    if (!emailExistente) {
      listaUser.push({
        id: listaUser.length + 1,
        nome: nome.value,
        email: emailCadastro.value,
        senha: senhaCadastro.value,
      });

      localStorage.setItem("listaUser", JSON.stringify(listaUser));

      alertaCadastro.style.display = "block";
      alertaCadastro.className = "alert alert-success";
      alertaCadastro.textContent = "Usuário cadastrado com sucesso";
      nome.value = "";
      emailCadastro.value = "";
      senhaCadastro.value = "";

      setTimeout(() => {
        alertaCadastro.style.display = "none";
        window.location.reload();
      }, 2000);
    } else {
      alertaCadastro.style.display = "block";
      alertaCadastro.className = "alert alert-danger";
      alertaCadastro.textContent =
        "O email já está cadastrado. Por favor, escolha outro email.";
    }
    setTimeout(() => {
      alertaCadastro.style.display = "none";
    }, 10000);
  } else if (!validSenha && !validNome && !validEmail) {
    alertaCadastro.style.display = "block";
    alertaCadastro.className = "alert alert-danger";
    alertaCadastro.textContent = "Preencha todos os campos.";
    setTimeout(() => {
      alertaCadastro.style.display = "none";
    }, 10000);
  } else if (!validNome) {
    validarNome();
  } else if (!validEmail) {
    validarEmail();
  } else if (!validSenha) {
    validarSenha();
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
    } else {
      alertaLogin.style.display = "block";
      alertaLogin.className = "alert alert-danger";
      alertaLogin.textContent = "e-mail ou senha inválido(s)";
      setTimeout(() => {
        alertaLogin.style.display = "none";
      }, 10000);
      log("deu ruim");
    }
  });
  if (emailLogin.value == "" || senhaLogin.value == "") {
    alertaLogin.style.display = "block";
    alertaLogin.className = "alert alert-danger";
    alertaLogin.textContent = "preencha todos os campos.";
    setTimeout(() => {
      alertaLogin.style.display = "none";
    }, 10000);
  } else if (
    emailLogin.value === userValid.email &&
    senhaLogin.value === userValid.senha
  ) {
    window.location.href = "./signin.html";
    let token = Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);

    localStorage.setItem("userLogado", JSON.stringify(userValid));
    log(token);
  } else {
    $("#modalSenhaIncorreta").modal("show");
  }

  log(userValid);
}
