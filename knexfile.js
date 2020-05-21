const client   = 'mysql';
const host     = process.env.MYSQL_HOST;
const user     = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

module.exports = {
    development : {
        client,
        connection : {
            host,
            user,
            password,
            database
        }
    },
    staging : {
        client,
        connection : {
            host,
            user,
            password,
            database
        },
        pool : {
            min : 2,
            max : 10
        },
        migrations : {
            tableName : 'knex_migrations'
        }
    },
    production : {
        client,
        connection : {
            host,
            user,
            password,
            database
        },
        pool : {
            min : 2,
            max : 10
        },
        migrations : {
            tableName : 'knex_migrations'
        }
    }
};
