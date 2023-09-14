import { Sequelize } from "sequelize";

export const database = new Sequelize(
    'crud-projeto-express-sequelize', 
    'postgres', 
    'root', {
        host: 'localhost',
        dialect: 'postgres'}
);