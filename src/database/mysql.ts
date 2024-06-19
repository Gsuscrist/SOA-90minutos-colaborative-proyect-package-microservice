import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";
import { getDatabaseCredentials, DatabaseCredentials } from "../aws/parameter";

const signale = new Signale();
dotenv.config();

async function createPool() {
    const credentials: DatabaseCredentials = await getDatabaseCredentials();

    const config = {
        host: credentials.host,
        user: credentials.user,
        database: credentials.name,
        password: credentials.password,
        waitForConnections: true,
        connectionLimit: 10,
    };

    // Crear el pool de conexiones
    return mysql.createPool(config);
}

let pool: mysql.Pool;

async function initializePool() {
    pool = await createPool();
}

initializePool();

export async function query(sql: string, params: any[]) {
    if (!pool) {
        signale.error("Pool no inicializado.");
        return null;
    }
    try {
        const conn = await pool.getConnection();
        signale.success("Conexión exitosa a la BD");
        const [result] = await conn.execute(sql, params);
        conn.release();
        return result;
    } catch (error) {
        signale.error(error);
        return null;
    }
}
