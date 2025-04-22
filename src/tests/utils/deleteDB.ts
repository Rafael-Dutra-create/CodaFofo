import {Client} from "pg";


export async function deleteDB(name: string): Promise<void> {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        password: process.env.PGPASSWORD,
        port: Number(process.env.PGPORT),
        database: 'postgres', // conecta ao banco padrão pra poder criar o novo
    })
    try {
        await client.connect();

        // Encerra conexões ativas com o banco que será deletado
        await client.query(`
            SELECT pg_terminate_backend(pid)
            FROM pg_stat_activity
            WHERE datname = $1
              AND pid <> pg_backend_pid();
        `, [name]);

        // Deleta o banco de dados
        await client.query(`DROP DATABASE IF EXISTS ${name};`);

        console.log(`Banco '${name}' deletado com sucesso.`);
    } catch (error) {
        console.error(`Erro ao deletar o banco '${name}':`, error);
    } finally {
        await client.end();
    }
}