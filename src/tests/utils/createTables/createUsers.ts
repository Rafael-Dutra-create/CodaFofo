import {pool} from "@/lib/db";
import bcrypt from "bcrypt";


export async function createUsers (): Promise<void> {
    console.log(`Criando schema e tabelas`)
    await pool.query(`CREATE SCHEMA IF NOT EXISTS codafofo`)
    await pool.query(`
            CREATE TABLE IF NOT EXISTS codafofo.users(
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT
                )
        `)

    const result = await pool.query(
        `SELECT * FROM codafofo.users WHERE email = $1`,
        [`rafael@email.com`]
    )

    if(result.rowCount === 0){
        const hashPassword = await bcrypt.hash(process.env.SENHA_LOGIN_TEST!, 10)
        await pool.query(`
                INSERT INTO codafofo.users (name, email, password)
                VALUES ($1, $2, $3)
            `, [`Rafael`, `rafael@email.com`, hashPassword])

        console.log(`Usuário de teste criado com sucesso`)
    }else{
        console.log(`Usuário de teste já existe.`)
    }
}