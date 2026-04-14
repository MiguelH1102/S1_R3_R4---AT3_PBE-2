export class Produto{
    #id;
    #nome;
    #valor;
    #caminhoImagem;
    #idCategoria;

    constructor(Nome,  Valor, idCategoria, caminhoImagem, Id){
        this.id = Id;
        this.nome = Nome;
        this.valor = Valor
        this.idCat = idCategoria;
        this.camImg = caminhoImagem
    }

    // Métodos acessores = GETTERS e SETTERS
    get id(){
        return this.#id;
    }
    set id(value){
        this.#validarId(value);
        this.#id = value;
    }

    get nome(){
        return this.#nome;
    }

    set nome(value){
        this.#validarNome(value);
        this.#nome = value
    }

    get valor(){
        return this.#valor;
    }

    set valor(value){
        this.#validarValor(value);
        this.#valor = value;
    }
    get idCat(){
        return this.#idCategoria
    }
    set idCat(value){
        this.#validarIdCategoria(value)
        this.#idCategoria = value
    }
    get camImg(){
        return this.#caminhoImagem
    }
    set camImg(value){
        this.#validarPathImagem(value)
        this.#caminhoImagem = value
    }

    // Métodos auxiliares
    #validarId(value){
        if(value && value <= 0){
            throw new Error('Verifique o ID informado');
        }
    }
    #validarNome(value){
        if(!value || value.trim().length < 3 || value.trim().length > 45){
            throw new Error('O campo nome é obrigatorio e deve ter entre 3 e 45 caracteres');
        }
    }
    #validarValor(value){
        if(!value || isNaN(value)){
            throw new Error('Verifique o foi um número informado');
        }
    }

    #validarIdCategoria(value){
        if(value && value <= 0){
            throw new Error('Verifique o idCategoria informado');
        }
    }
    #validarPathImagem(value){
        if(value){
            if(value.trim().length < 3){
                throw new Error('Verefique o Path de Imagem');

            }
        }
    }

    // Criação de objetos utilizando o Desing Pattern FACTORY METHOD
    static criar(dados){
        return new Produto(dados.nome, dados.valor, dados.idCategoria, dados.caminhoImagem, null);
    }
    static alterar(dados, id){
        return new Produto(dados.nome, dados.valor, dados.idCategoria, null, id);
    } 
}