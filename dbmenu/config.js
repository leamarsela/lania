function config() {
  return {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'laniadb'
    }
  }
};

exports.config = config;