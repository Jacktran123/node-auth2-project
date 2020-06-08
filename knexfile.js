// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/users.db3',
    },
    migration:{
      filename: './data/migrations',
    },
    seeds:{
      filename:'./data/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
  },
}
};
