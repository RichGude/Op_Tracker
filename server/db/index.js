// Import libraries
const { Pool } = require('pg')
// Connection string that is passed using environment variables and given docker-compose variables ('db', '5432')
const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:5432/${process.env.POSTGRES_DB}`

// The pg library will identify the environment variables it needs, if they're not specified in Pool
const pool = new Pool({
  connectionString,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}