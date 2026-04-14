import { Cliente } from "../models/Cliente.js";
import { Telefone } from "../models/Telefone.js";
import { Endereco } from "../models/Endereco.js";
import clienteRepository from "../repositories/clienteRepository.js";
import axios from "axios";

const clienteController = {

    criar: async (req, res) => {
        try {
            const { nome, cpf, telefone, cep, numero, complemento } = req.body;

            if (!/^[0-9]{8}$/.test(cep)) {
                return res.status(400).json({ message: 'CEP inválido' });
            }

            const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (resp.data.erro) {
                return res.status(400).json({ message: 'CEP não encontrado' });
            }

            const { bairro, localidade, uf, logradouro } = resp.data;

            const cliente = Cliente.criar({ nome, cpf });

            const telefoneObj = Telefone.criar({ telefone });

            const enderecoObj = Endereco.criar({
                cep,
                bairro,
                cidade: localidade,
                uf,
                numero,
                logradouro,
                complemento
            });
            
            const result = await clienteRepository.criar(
                cliente,
                telefoneObj,
                enderecoObj
            );

            res.status(201).json({
                message: "Cliente cadastrado com sucesso",
                result
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Erro ao cadastrar cliente',
                errorMessage: error.message
            });
        }
    },
    selecionar: async (req, res) => {
        try {
            const result = await clienteRepository.selecionar();
            res.status(200).json({result});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message})
        }
    },
    deletar: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await clienteRepository.deletar(id);
            res.status(200).json({result});
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Ocorreu um erro no servidor', errorMessage: error.message})
        }
    },

};
  async function consultaCep(cep) {
        try {
              const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
               if (resp.data.erro) {
                return res.status(400).json({ message: 'CEP não encontrado' });
            }
            return respApi.data;

        } catch (error) {
            console.error(error)
            throw new Error("Erro ao buscar o CEP", error.message)
        }
    }

export default clienteController;