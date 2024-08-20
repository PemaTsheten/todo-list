const knex = require('knex')({
    client: 'pg',
    connection: {
        host: "localhost",
        port: 5432,
        user: "pema",
        password: "1234",
        database: "todo_dev",
    }
})
export default knex;