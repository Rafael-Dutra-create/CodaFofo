import { Client } from 'pg'

export async function createDB(name: string) {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        password: process.env.PGPASSWORD,
        port: Number(process.env.PGPORT),
        database: 'postgres', // conecta ao banco padrão pra poder criar o novo
    })

    try {
        await client.connect()
        console.log(`✅ Conectado ao banco 'postgres'`)

        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [name]
        )
        const exists = result.rowCount && result.rowCount > 0

        if (!exists) {
            await client.query(`CREATE DATABASE "${name}"`)
            console.log(`✅ Banco de teste "${name}" criado.`)
        } else {
            console.log(`ℹ️ Banco de teste "${name}" já existe.`)
        }
    } catch (err) {
        console.error(`❌ Erro ao criar banco de teste:`, err)
        throw err // propaga o erro para Vitest saber
    } finally {
        await client.end()
        console.log(`🔌 Conexão encerrada com o banco 'postgres'`)
    }
}