import {describe, it, expect} from "vitest";
import {NextRequest} from "next/server";
import {POST} from "@/app/api/login/route";


describe(`POST /api/login`, () => {

    it(`deve retornar status 200`, async () => {
        const req = new NextRequest(new URL("http://localhost"), {
            method: `POST`,
            body: JSON.stringify({
                email: "rafael@email.com",
                password: "senha123test"
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const res = await POST(req)

        const data = await res.json()
        expect(res.status).toBe(200)
        expect(data.user).toEqual({ id: 1, name: 'Rafael', email: 'rafael@email.com' })

    })

    it(`deve retornar status 400`, async () => {
        const req = new NextRequest(new URL("http://localhost"), {
            method: `POST`,
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' }
        });
        const res = await POST(req)

        const data = await res.json()
        expect(res.status).toBe(400)
        expect(data.error).toMatch(/Email e senha são obrigatórios/)
    })

    it(`deve retornar status 404`, async () => {
        const req = new NextRequest(new URL("http://localhost"), {
            method:`POST`,
            body:JSON.stringify({
                email: "teste@email.com",
                password: "123"
            }),
            headers: { 'Content-Type': 'application/json' }
        })
       const res = await POST(req)
       const data = await res.json()
        expect(res.status).toBe(404)
        expect(data.error).toMatch(/Usuário ou senha inválidos/)
    })


    it(`deve retornar status 401`, async () => {
        const req = new NextRequest(new URL("http://localhost"), {
            method:`POST`,
            body:JSON.stringify({
                email: "rafael@email.com",
                password: "123"
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        const res = await POST(req)
        const data = await res.json()
        expect(res.status).toBe(401)
        expect(data.error).toMatch(/Usuário ou senha inválidos/)
    })



})