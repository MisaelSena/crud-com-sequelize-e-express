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



