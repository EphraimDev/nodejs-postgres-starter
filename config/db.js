require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    use_env_variable: process.env.DATABASE_URL,
  },
  test: {
    username: process.env.CI_DB_USER,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOST,
    dialect: 'postgres',
    use_env_variable: process.env.DATABASE_URL,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    use_env_variable: process.env.DATABASE_URL,
  },
};
