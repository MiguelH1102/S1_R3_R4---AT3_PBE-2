import { connection } from "../config/Database.js";

const clienteRepository = {
    criar: async (cliente, telefone, endereco) => {

        const conn = await connection.getConnection();

        try {
             conn.beginTransaction();

           
            const sqlCliente = `
                INSERT INTO clientes (Nome, Cpf) VALUES (?, ?);`;
            const valuesCliente = [cliente.nome, cliente.cpf];
            const [rowCli] = await conn.execute(sqlCliente, valuesCliente);

           
             const sqlTelefone = `
                 INSERT INTO telefones (Telefone, idCliente) VALUES (?, ?);`;
             const valuesTelefone = [ telefone.telefone, rowCli.insertId];
             const [rowTel]=await conn.execute(sqlTelefone, valuesTelefone);
            
            
             const sqlEndereco = `
                INSERT INTO enderecos (numero, cidade, bairro, cep, complemento, uf, logradoro, idCliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
            const valuesEndereco = [endereco.numero, endereco.cidade,endereco.bairro, endereco.cep, endereco.complemento, endereco.uf, endereco.logradoro, rowCli.insertId]; 
            const [rowEnd] = await conn.execute(sqlEndereco, valuesEndereco);

            await conn.commit();

        } catch (error) {
            await conn.rollback();
            throw error;
        
        }
        finally{
            conn.release()
        }
    },
     selecionar: async () => {
        const sql = 'SELECT clientes.Id, clientes.Nome, clientes.Cpf, clientes.DataCad, telefones.Telefone, enderecos.numero, enderecos.cidade, enderecos.bairro, enderecos.cep, enderecos.complemento, enderecos.uf, enderecos.logradoro FROM clientes LEFT JOIN telefones ON telefones.idCliente = clientes.Id LEFT JOIN enderecos ON enderecos.idCliente = clientes.Id';
        const [row] = await connection.execute(sql);
        return row
    },
      deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
             conn.beginTransaction();

             const sqlEnd = 'DELETE FROM enderecos WHERE idCliente = ?';
             const [rowEnd] = await conn.execute(sqlEnd, [id]);

             const sqlTel = 'DELETE FROM telefones WHERE idCliente = ?'
             const [rowTel] = await conn.execute(sqlTel, [id]);

            const sqlCli = 'DELETE FROM clientes WHERE id = ?'
            const [rowCli] = await conn.execute(sqlCli, [id]);

            await conn.commit();

            return {rowCli, rowEnd, rowTel};

        } catch (error) {
            await conn.rollback();
            throw error;
        }
        finally{
            conn.release()
        }
       
    },

    
};

export default clienteRepository;