module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ['dist/entity/*.js'],
  migrations: ['dist/src/migration/**/*.js'],
  subscribers: ['dist/src/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  },
  extra: {
    ssl: true
  }
};
