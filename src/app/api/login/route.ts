'use server'
import {NextRequest, NextResponse} from "next/server";
import {getUserByEmail} from "@/controller/userController";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST (request: NextRequest) {
    const body = await request.json();
    const {email, password} = body;

    if(!email || !password) {
        return NextResponse.json(
            {error: `Email e senha são obrigatórios`},
            {status: 400}
        );
    }

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                { error: `Usuário ou senha inválidos`},
                { status: 404 }
            );
        }

        if (!user.password){
            return NextResponse.json(
                {error: `Altere sua senha com o primeiro acesso!`},
                {status: 404}
            )
        }

        if (user.password) {
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return NextResponse.json(
                    {error: `Usuário ou senha inválidos`},
                    {status: 401}
                )
            }
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET as string,
            {expiresIn: `1d`}
        )

        const { password: _, ...userData } = user;

        return NextResponse.json({ user: userData, token: token});
    } catch (error) {
        console.log(`[LOGIN_ERROR]`, error);
        return NextResponse.json(
            {error: `Erro interno no servidor`},
            {status: 500}
        );
    }
}