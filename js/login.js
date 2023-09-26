//capturando os 3 campos da tela
let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnEntrar = document.getElementById('btn-entrar');


//captura o evento de click para tomar uma ação qualquer
btnEntrar.addEventListener('click', () =>{

    //1° Pegar o email digitado
    let userEmail =email.value;    
    //2° Pegar a senha digitada
    let userSenha = senha.value;
    //3° Validar o email e senha
    if(!userEmail || !userSenha){
    //4° Caso vazios mandar mensagem de erro
        window.alert("Email ou senha invalido(s).");
        return;
    }
    //Verificar o email e senha
    autenticar(userEmail, userSenha);
});


function autenticar(email, senha){
    const url = 'http://localhost:3400';

    fetch(`${url}/login`, {
        method: "POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email, senha})
    })
    .then(response=>response = response.json())
    .then(response=>{
        if(!!response.mensagem){
            alert(response.mensagem);
            return;
        }else{
            salvalToken(response.token);
            salvalUsuario(response.usuario);
            window.open("../html/cliente.html", "_self");
        }
    })
    
 
};

