const URL = 'http://localhost:3400/clientes';

let modoEdicao = false;

let listaClientes = [];

let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaCliente = document.querySelector('table>tbody');
let modalCliente = new bootstrap.Modal(document.getElementById('modal-cliente'), {});
let tituloModal = document.querySelector('h4.modal-title');
let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

let formModal = {
    id: document.getElementById("id"),
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    telefone: document.getElementById("telefone"),
    cpf: document.getElementById("cpf"),
}

btnAdicionar.addEventListener('click', () =>{
    modoEdicao = false;
    tituloModal.textContent = "Adicionar cliente";
    limparModalCliente();
    modalCliente.show();
});


btnSalvar.addEventListener('click', () => {
    //Capturar dados do modal
    let cliente = obterClientesModal();
    //Conferir se os campos obrigatórios estão preenchidos
    if (cliente.nome == "" || cliente.email == "" || cliente.telefone == "" || cliente.cpf == "") {
        alert("Preencha todos os campos obrigatórios");
        return;
    }
    //Enviar o cadrastro
    if (modoEdicao){
        atualizarClienteBackend(cliente);
    }else{
        adicionarClienteBackend(cliente);
    }
    //Atualizar a tabela
    
});

btnCancelar.addEventListener('click', () => {
    modalCliente.hide();
});

function obterClientesModal(){
    return new Cliente({
        id: formModal.id.value,
        nome: formModal.nome.value,
        email: formModal.email.value,
        telefone: formModal.telefone.value,
        cpfOuCnpj: formModal.cpf.value,
    });
}

function obterClientes() {
    fetch(URL, {
        method: 'GET',
        headers: {'Authorization': obterToken()}
    })
        .then(response => response.json())
        .then(clientes => {
            listaClientes = clientes;
            popularTabela(clientes);
        })
        .catch()
}

function editarCliente(id) {
    modoEdicao = true;
    tituloModal.textContent = "Editar cliente";

    let cliente = listaClientes.find(cliente => cliente.id === id);

    atualizarModalCliente(cliente);

    modalCliente.show();
}

function atualizarModalCliente(cliente) {
    formModal.id.value = cliente.id;
    formModal.nome.value = cliente.nome;
    formModal.email.value = cliente.email;
    formModal.telefone.value = cliente.telefone;
    formModal.cpf.value = cliente.cpfOuCnpj;
}

function limparModalCliente() {
    formModal.id.value = "";
    formModal.nome.value = "";
    formModal.email.value = "";
    formModal.telefone.value = "";
    formModal.cpf.value = "";
}

function excluirCliente(id) {
    let cliente = listaClientes.find(cliente => cliente.id == id);
    if (confirm("Deseja realmente excluir o cliente " + cliente.nome + "?")){
        excluirClienteBackend(cliente)
    }
}

function criarLinha(cliente) {
    
    //criar uma linha
    let tr = document.createElement('tr');

    //criar as tds
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCPF = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdTelefone = document.createElement('td');
    let tdData = document.createElement('td');
    let tdAcao = document.createElement('td');

    //adicionar os valores dos clientes
    tdId.textContent = cliente.id;
    tdNome.textContent = cliente.nome;
    tdCPF.textContent = cliente.cpfOuCnpj;
    tdEmail.textContent = cliente.email;
    tdTelefone.textContent = cliente.telefone;
    tdData.textContent = new Date (cliente.dataCadastro).toLocaleDateString();
    tdAcao.innerHTML = `<button onclick="editarCliente(${cliente.id})" class="btn btn-outline-primary btn-sm mr-2"><i class='fa fa-pen'></i> Editar</button> 
                        <button onclick="excluirCliente(${cliente.id})" class="btn btn-outline-danger btn-sm mr-3"><i class='fa fa-trash'></i>  Deletar</button>`;


    //adicionar as tds dentro da linha
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdCPF);
    tr.appendChild(tdEmail);
    tr.appendChild(tdTelefone);
    tr.appendChild(tdData);
    tr.appendChild(tdAcao);


    //adicionar a linha na tabela
    tabelaCliente.appendChild(tr);

}

function popularTabela(clientes) {

    // Limpar a tabela 
    tabelaCliente.textContent = "";
    clientes.forEach(cliente => {
        criarLinha(cliente);
    });
}

function adicionarClienteBackend(cliente) {

    cliente.dataCadastro = new Date().toISOString();

    fetch(URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(response => {
        let novoCliente = new Cliente(response);
        listaClientes.push(novoCliente);
        popularTabela(listaClientes);
        //Fechar o modal
        modalCliente.hide();

        Swal.fire({
            icon: 'success',
            title: 'Cliente adicionado com sucesso',
            showConfirmButton: false,
            timer: 2000
          })
    })
    .catch(error =>{
        console.log(error);
    })
}
function atualizarClienteBackend(cliente) {

    fetch(`${URL}/${cliente.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(response => {

        atualizarClienteNaLista(response, false)

        modalCliente.hide();
        Swal.fire({
            icon: 'success',
            title: 'Cliente editado com sucesso',
            showConfirmButton: false,
            timer: 2000
          })
    })
    .catch(error =>{
        console.log(error);
    })
}
function excluirClienteBackend(cliente) {

    fetch(`${URL}/${cliente.id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        }
    })
    .then(response => response.json())
    .then(()=> {

        atualizarClienteNaLista(cliente, true)

        modalCliente.hide();

        Swal.fire({
            icon: 'success',
            title: 'Cliente removido com sucesso',
            showConfirmButton: false,
            timer: 2000
          })
    })
    .catch(error =>{
        console.log(error);
    })
}

function atualizarClienteNaLista(cliente, removerCliente) {

    let indice = listaClientes.findIndex((c) => c.id == cliente.id);         

    (removerCliente) ? listaClientes.splice(indice, 1) : listaClientes.splice(indice , 1, cliente);

    popularTabela(listaClientes);
}


obterClientes();