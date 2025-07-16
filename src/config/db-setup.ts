import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient({
  log:
    process.env.DISABLE_SQL_LOGGER === 'true'
      ? []
      : ['query', 'info', 'warn', 'error'],
});

const testDbConnection = async () => {
  try {
    await prisma.$connect();
    logger.info('Connection has been established successfully.');
    return true;
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    return false;
  }
};

const runMigrations = async () => {
  try {
    await testDbConnection();
    logger.info('Database migrations should be run via: npm run db:migrate');
    return true;
  } catch (error) {
    logger.error('Migration error:', error);
    throw new Error('Migration Error');
  }
};

const initializeDatabase = async () => {
  try {
    await testDbConnection();
    logger.info('Database initialization completed successfully.');
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
};

const closeDatabase = async () => {
  try {
    await prisma.$disconnect();
    logger.info('Database connection closed.');
  } catch (error) {
    logger.error('Error closing database connection:', error);
  }
};

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    await initializeDatabase();
  }
})();

export {
  prisma as db,
  testDbConnection,
  runMigrations,
  initializeDatabase,
  closeDatabase,
};
