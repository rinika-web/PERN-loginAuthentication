const { query } = require("express");
const {Pool} = require("pg");

const pool = new Pool ({
    user: "postgres",
    password: "password2024",
    host: "localhost",
    port: "5432",
    database: "study",
});

module.exports = {
    query: (text, params) => pool.query(text,params)
};
