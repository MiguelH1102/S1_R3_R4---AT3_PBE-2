export class Endereco {
    #id;
    #cep;
    #bairro;
    #cidade;
    #uf;
    #numero;
    #logradoro;
    #complemento;

    constructor(cep, bairro, cidade, uf, numero, logradouro, complemento = '', id = null) {
        this.id = id;
        this.cep = cep;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.numero = numero;
        this.logradoro = logradouro;
        this.complemento = complemento;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get cep() {
        return this.#cep;
    }

    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(value) {
        this.#bairro = value;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(value) {
        this.#validarCidade(value);
        this.#cidade = value;
    }

    get uf() {
        return this.#uf;
    }

    set uf(value) {
        this.#validarUf(value);
        this.#uf = value;
    }

    get numero() {
        return this.#numero;
    }

    set numero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }

    get logradouro() {
        return this.#logradoro;
    }

    set logradouro(value) {
        this.#validarLogradouro(value);
        this.#logradoro = value;
    }

    get complemento() {
        return this.#complemento;
    }

    set complemento(value) {
        this.#complemento = value;
    }


    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('ID inválido');
        }
    }

    #validarCep(value) {
        if (!value || value.trim().length !== 8) {
            throw new Error('CEP deve conter 8 caracteres');
        }
    }

    #validarCidade(value) {
        if (!value || value.trim().length < 2) {
            throw new Error('Cidade inválida');
        }
    }

    #validarUf(value) {
        if (!value || value.trim().length !== 2) {
            throw new Error('UF deve conter 2 caracteres');
        }
    }

    #validarNumero(value) {
        if (!value || value.trim().length === 0) {
            throw new Error('Número é obrigatório');
        }
    }

    #validarLogradouro(value) {
        if (!value || value.trim().length < 3) {
            throw new Error('Logradouro inválido');
        }
    }

    

    static criar(dados) {
        return new Endereco(dados.cep, dados.bairro, dados.cidade, dados.uf, dados.numero, dados.logradouro, dados.complemento, null);
    }

    static alterar(dados, id) {
        return new Endereco( dados.cep, dados.bairro, dados.cidade, dados.uf, dados.numero, dados.logradouro, dados.complemento, id);
    }
}