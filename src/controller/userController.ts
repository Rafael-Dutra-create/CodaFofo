//controller
import {pool} from "@/lib/db";
import {CreateUser, User} from "@/model/user";

export const getAllUsers = async ():Promise<User[]> => {
    const response = await pool.query(`SELECT * FROM users`)
    return response.rows;
}

//N VOU USAR ESSA MERDA
export const getUserById = async (id: number):Promise<User | null> => {
    const response = await pool.query(`
        SELECT * FROM "codafofo"."users" WHERE id = $1
    `, [id])

    return response.rows[0];
}

export const getUserByEmail = async (email: string):Promise<User | null> => {
    const response = await pool.query(`
        SELECT * FROM "codafofo"."users" WHERE email = $1
    `, [email])
    return response.rows[0];
}

export const createUser = async (user: CreateUser):Promise<User> => {
    const response = await pool.query(`
        INSERT INTO "codafofo"."users" (name, email, password) VALUES ($1, $2, $3) RETURNING *
    `, [user.name, user.email, user.password])
    return response.rows[0];
}

export const deleteUser = async (id?: number, email?: string):Promise<string> => {
    if(!id && !email){
        throw new Error('Passe o id ou email do Usuário!');
    }

    let query;
    let value: number | string;

    if(id){
        query = `DELETE FROM "codafofo"."users" WHERE id = $1`;
        value = id;
    }
    if(email){
        query = `UPDATE "codafofo"."users" SET email = $1`
        value = email
    }

    await pool.query(query!, [value!])
    return `Usuário deletado com sucesso!`
}

export const updateUser = async (id: number, email?: string, name?: string):Promise<User> => {
    if(!name && !email){
        throw new Error(`Informe pelo menos o nome ou email para atualizar.`)
    }

    const fields: string[] = [];
    const values: (number | string)[] = [];
    let paramIndex = 1;

    values.push(id);
    const idParamIndex = paramIndex;

    if(email){
        fields.push(`email = $${paramIndex++}`);
        values.push(email);
    }
    if(name){
        fields.push(`name = $${paramIndex++}`);
        values.push(name);
    }

    const query = `
        UPDATE "codafofo"."users" SET ${fields.join(',')}
        WHERE id = $${idParamIndex}
        RETURNING *;
    `;

    const response = await pool.query(query!, values);
    return response.rows[0];
}