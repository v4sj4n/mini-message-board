const { Pool } = require("pg")

const pool = new Pool({
  user: "userName",
  password: "password",
  host: "host",
  port: 5432,
  database: "database",
//   ssl: true,
})

module.exports = {
  query: (text) => pool.query(text),
}
