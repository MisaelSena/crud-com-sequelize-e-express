import { Sequelize, DataTypes } from "sequelize";
import { database } from "../db";

export const User = database.define('usuario',{
    nome:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    }

})