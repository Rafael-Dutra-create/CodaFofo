// setupVitest.ts
import {afterAll, beforeAll, vi} from 'vitest'
import {createDB} from "@/tests/utils/createDB";
import {pool} from "@/lib/db";
import bcrypt from "bcrypt";
import path from "path";
import dotenv from 'dotenv';
import {deleteDB} from "@/tests/utils/deleteDB";
import {createUsers} from "@/tests/utils/createTables/createUsers";
dotenv.config({ path: path.resolve(__dirname, '../.env.test') });

beforeAll(async () => {
    console.log('Testes iniciados...');
    console.log(`Criando banco de teste`)
    if (process.env.NODE_ENV === 'test') {
        await createDB(`codafofo_test`)
        console.log(`db criado`)
       await createUsers()
    }

})

afterAll(async () => {
    await pool.end()
    console.log('Limpando recursos de teste...');
    await deleteDB(`codafofo_test`)
})


