import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const PASSWORD = process.env.DB_PASSWORD;
const USER = process.env.DB_USER;
const HOST = process.env.DB_HOST;
const NAME = process.env.DB_NAME;

const testDB = new Sequelize(NAME, USER, PASSWORD, {
  host: HOST,
  dialect: "postgres",
  logging: false,
  timestamps: false,
  sync: true,
  define: {
    timestamps: false,
    sync: true,
  },
});

export default {
  sequelize: testDB,
  Op: Sequelize.Op,
  Sequelize,
  DataTypes: Sequelize.DataTypes,
};

/*const Pool = require('pg').Pool;

const pool=new Pool({
    user: "explorer3",
    password:"explorer3",
    host:'localhost',
    port:'5432',
    database:"explorer3"

})*/
