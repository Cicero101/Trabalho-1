// Classe que representa o cliente
class Cliente {
    constructor (obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.cpfOuCnpj = obj.cpfOuCnpj;
        this.telefone = obj.telefone;
        this.email = obj.email;
        this.dataCadastro = obj.dataCadastro;
    }
}