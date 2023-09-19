/*
    Este foi apenas um CRUD simples. O projeto principal estará em melhor qualidade 
    no meu repositório https://github.com/MisaelSena/ como um sistema de classificados 
    de anúncios de casas e apartementos para aluguel.
*/
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { database } from './database/db';
import { User } from './database/models/user.model';

const app = express();

app.use(bodyParser.json());

app.listen(3000);

app.get('/',(req,res)=>{
    res.send('Home');
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
async function cadastrandoUsuario(req: Request, res:Response){
    const cadastrarUsuario = await User.create({
        nome: req.body.nome,
        email: req.body.email
    })
    res.json(cadastrarUsuario);
}
app.post('/cadastrar',cadastrandoUsuario)

//Consultando Usuário
async function consultaUsuariosCadastrados(req:Request,res:Response) {
    if (!req.query.nome) {
        const usuariosCadastrados = await User.findAll();
        res.json(usuariosCadastrados);
    } else {
        const usuarioPesquisado = await User.findAll({
            where:{
                nome: req.query.nome
            }
        });
        res.json(usuarioPesquisado);
    } 
    
}
app.get('/usuarios',consultaUsuariosCadastrados);

//Atualizar usuário
async function atualizarUsuario(req:Request, res:Response) {
    const { id } = req.params;
    const usuarioAtualizar = await User.findByPk(id);
    const novoEmail = req.body.email;
    usuarioAtualizar.email = novoEmail;

    await usuarioAtualizar?.save();

    res.json(usuarioAtualizar);
}
app.put('/atualizar/:id',atualizarUsuario);

//Deletar Usuário

async function deletarUsuario(req:Request, res:Response) {
    const { id } = req.params;
    const usuarioADeletar = await User.findByPk(id);

    usuarioADeletar?.destroy();
    res.json();
}
app.delete('/deletar/:id',deletarUsuario);

