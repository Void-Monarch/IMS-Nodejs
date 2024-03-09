import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

interface Config {
  database: {
    DATABASE: string;
    DATABASE_PASSWORD: string;
    DATABASE_LOCAL: string;
    DB_TYPE: string;
  };
  JWT: {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_COOKIE_EXPIRES_IN: number | any;
  };
  protocol: string;
  PORT: number;
  node_env: string;

}

let config : Config ;

export default config = {
  // database details
  database: {
    DATABASE: process.env.DATABASE !,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD !,
    DATABASE_LOCAL: process.env.DATABASE_LOCAL !,
    DB_TYPE: 'LIVE' || 'LOCAL',
  },
  //  JWT TOKEN CONFIGs
  JWT: {
    JWT_SECRET:
      process.env.JWT_SECRET || 'A-SECRET-SO-SERECT-THAT-EVEN-I-DONT-KNOW-?',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    JWT_COOKIE_EXPIRES_IN:
      process.env.JWT_COOKIE_EXPIRES_IN || 30 * 24 * 60 * 60 * 1000,
  },
  protocol: process.env.PROTOCOL || 'http',
  PORT: ( process.env.PORT! ) || 3000,
  node_env: process.env.NODE_ENV || 'development',
};
