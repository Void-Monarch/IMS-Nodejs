import mongoose, { ErrorHandlingMiddlewareFunction } from 'mongoose';
import config from './src/config/config';


process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './src/app';

// DATABASE CONFIG AND CONNECTION
let DB : string = "";

if (config.database.DB_TYPE === 'LOCAL') {
  DB = config.database.DATABASE_LOCAL;
} else if (config.database.DB_TYPE === 'LIVE') {
  // Live server
  DB = config.database.DATABASE.replace(
    '<PASSWORD>',
    config.database.DATABASE_PASSWORD,
  );
}

const mongoDBConnection = mongoose
  .connect(DB, {})
  .then(() =>
    console.log(
      `[+] DB connection successful! | Connected with [findmyway] database : ${config.database.DB_TYPE} \n`,
    ),
  );

// SEVER CONFIG AND CONNECTION
const port = config.PORT;
const server = app.listen(port, () => {
  console.log(
    `\n[+] App running on port ${port}...\n[+] Go to http://127.0.0.1:${port}`,
  );
});

process.on('unhandledRejection', (err : Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});