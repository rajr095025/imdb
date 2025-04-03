const mysql = require("mysql");

const HOST = "localhost";
const USER = "root";
const PASSWORD = "";
const DATABASE = "four_junctions_imdb";

const createConnectionPool = () => {
  return mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    multipleStatements: true,
  });
};

const connectionPool = createConnectionPool();

module.exports = connectionPool;
