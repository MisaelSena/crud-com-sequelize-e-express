import express, { Request, Response } from 'express';
import { database } from './database/db';
import { User } from './database/models/user.model';

const app = express();

app.listen(3000);

app.get('/',(req,res)=>{
    res.send('Get teste');
})

//Conexão com o Postgres
async function autenticacao() {
    try {
        await database.authenticate();
        console.log('Conectado ao Banco de Dados Com Sucesso!');
    } catch (error) {
        console.error('Conexão com o banco falhoou! Erro:',error);
    }
    await User.sync();  
}
autenticacao();

//Cadastrando Usuário
async function cadastrandoUsuario(){
    const cadastrarUsuario = await User.create({
        nome: 'Andreza',
        email:'andreza@gmail.com'
    })
}
//cadastrandoUsuario();

//Consultando Usuário Cadastrados

async function conusltaUsuariosCadastrados(req:Request,res:Response) {
    const usuariosCadastrados = await User.findAll();
    res.json(usuariosCadastrados);
}
app.get('/usuarios',conusltaUsuariosCadastrados);

