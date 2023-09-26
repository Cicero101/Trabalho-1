

let btnTema = document.getElementById('btn-tema');
let btnAdicionar = document.getElementById('btn-adicionar');
let novoTema = "dark";
let temaAtual = "dark";
let iconBotao = document.getElementById('icon-tema-botao');


// Carrega o tema quando a página carregar
localStorage.getItem("theme");

// Muda o tema quando usar o botão
localStorage.setItem("theme", novoTema);


btnTema.addEventListener("click", () =>{
    if (temaAtual == "dark"){
        novoTema = "light";
        iconBotao.className = "fa fa-sun";
        btnTema.className = "btn btn-light btn-sm";
    }else {
        novoTema = "dark";
        iconBotao.className = "fa fa-moon";
        btnTema.className = "btn btn-dark btn-sm" ;
    }
    document.querySelector("html").setAttribute("data-bs-theme", novoTema);
    localStorage.setItem("theme", novoTema);
    temaAtual = novoTema;
});


btnAdicionar.addEventListener('click', () =>{
    alert("Preencha todos os campos obrigatórios");
});