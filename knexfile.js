module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'nest',
      user:     'postgres',
      password: 'bixkafa',
      host: 'localhost'
    },
    migrations: {
      directory: './migrations'
    }
  },
};
