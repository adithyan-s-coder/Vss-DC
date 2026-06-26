import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql2 from 'mysql2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

let MYSQL_URI = process.env.MYSQL_URI || 'mysql://root@localhost:3306/vss_dc';
MYSQL_URI = MYSQL_URI.trim();

let servername = undefined;
const aivenHost = 'mysql-1b61df45-adithyannn-573a.h.aivencloud.com';
if (MYSQL_URI.includes(aivenHost)) {
    servername = aivenHost;
    MYSQL_URI = MYSQL_URI.replace(aivenHost, '143.110.246.40');
}

const sequelizeOptions = {
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false
};

if (MYSQL_URI.includes('aivencloud') || servername || process.env.NODE_ENV === 'production') {
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
    if (servername) {
        sequelizeOptions.dialectOptions.ssl.servername = servername;
    }
}

export const sequelize = new Sequelize(MYSQL_URI, sequelizeOptions);
