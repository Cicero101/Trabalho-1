let btnTema = document.getElementById('btn-tema');
let novoTema = localStorage.getItem("theme");
let temaAtual = novoTema;
let iconBotao = document.getElementById('icon-tema-botao');
let tabelaTema = document.getElementById('tabela-cliente');

if (novoTema == ""){
    novoTema = "dark";
    temaAtual = novoTema;
    trocaPaginaTema();
}
// Carrega o tema quando a página carregar
localStorage.getItem("theme");

// Muda o tema salvo no local storage quando usar o botão
localStorage.setItem("theme", novoTema);

function trocaPaginaTema() {
    if (localStorage.getItem("theme") == "dark") {
        temaDark();
    } else {
        temaLight();
    }
}

btnTema.addEventListener("click", () => {
    if (temaAtual == "dark") {
        temaLight();
    } else {
        temaDark();
    }
    localStorage.setItem("theme", novoTema);
    temaAtual = novoTema;
});

function temaDark(tema) {
    novoTema = "dark";
    iconBotao.className = "fa fa-moon";
    btnTema.className = "btn btn-dark btn-sm";
    document.querySelector("html").setAttribute("data-bs-theme", novoTema);
    if (window.location.pathname == "/html/cliente.html") {
        tabelaTema.className = "table table-bordered table-dark table-hover";
    }
}

function temaLight(tema) {
    novoTema = "light";
    iconBotao.className = "fa fa-sun";
    btnTema.className = "btn btn-light btn-sm";
    document.querySelector("html").setAttribute("data-bs-theme", novoTema);
    if (window.location.pathname == "/html/cliente.html") {
        tabelaTema.className = "table table-bordered table-light table-hover";
    }
}
//Funções base de autenticação e controle de fluxo

function salvalToken(token) {
    localStorage.setItem('token', token);
}

function salvalUsuario(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function obterToken() {
    return localStorage.getItem('token');
}

function obterUsuario() {
    return localStorage.getItem('usuario') || '{}';
}

function sairSistema() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    direcionarTelaDeLogin();
}

function direcionarTelaDeLogin() {
    window.open("../html/login.html", "_self");
}

function usuarioEstaLogado() {
    let token = obterToken();
    return !!token;
}

function validarUsiarioAutenticado() {
    let logado = usuarioEstaLogado();

    if (window.location.pathname == "/html/login.html") {

        if (logado) {
            window.open("../html/cliente.html", "_self")
        }

    } else if (!logado && (window.location.pathname == "/html/cliente.html" || window.location.pathname =="/html/produto.html" || window.location.pathname =="/html/usuarios.html")) {
        direcionarTelaDeLogin();
    }
}

validarUsiarioAutenticado();

trocaPaginaTema();