export class Cliente {
    #id;
    #nome;
    #cpf;

    constructor(nome, cpf, id) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
    }



    get id() {
        return this.#id;
    }

    set id(value) {
        this.#validarId(value);
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }



    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o ID informado');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O campo nome é obrigatório e deve ter entre 3 e 45 caracteres');
        }
    }

    
#validarCpf(cpf) {
    const regex = /^[0-9]{11}$/;
        if (!regex.test(cpf)) {
            throw new Error("CPF inválido");
        }
    }



    static criar(dados) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            null
        );
    }

    static alterar(dados, id) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            id
        );
    }
}