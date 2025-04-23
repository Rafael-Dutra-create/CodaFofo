'use client'

import {useState} from "react";


export default function Login(){
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [mensage, setMensage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

   async function submit():Promise<void>{
        try{
            setIsLoading(true)
            const res = await fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json();

            if(res.ok){
                console.log('Sucesso:', data);
            }else{
                console.error('Erro:', data);
                setMensage(data.error)
            }
        }catch (error){
            console.error('Erro na requisição:', error);
            setMensage('Ops! Estamos com problemas, tente novamente mais tarde.')
        }finally{
            setIsLoading(false)
        }
    }


    return(
        <div className={'text-black h-[90%] flex flex-col items-center gap-3 justify-center'}>
            <div className="bg-[url(/img/logo-codafofo.png)] bg-contain bg-center w-32 h-32"/>
            <form className={`flex flex-col gap-3 md:gap-5 justify-center`}
                  onSubmit={e => {
                        e.preventDefault();
                        submit().then(r => r);
                  }}
            >
                <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-600 to-blue-600">
                    <input
                        className="p-2 rounded-sm w-full focus:outline-none focus:bg-gray-200 bg-white"
                        type="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="p-[2px] rounded-md bg-gradient-to-r from-purple-600 to-blue-600">
                <input
                    className="p-2 rounded-sm w-full focus:outline-none focus:bg-gray-200 bg-white"
                    type="password"
                    placeholder="Senha"
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
                <ButtonLogin isLoading={isLoading}/>
                {mensage && <p className="text-red-500 text-sm mx-auto">{mensage}</p>}
            </form>
        </div>
    )
}

function ButtonLogin(loading: { isLoading: boolean }){
    return(
        <button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-1 rounded-sm"
            type={"submit"}>{loading.isLoading ?
            (<div className="w-6 h-6 border-3 border-t-3 border-purple-600 border-t-blue-600 border-solid rounded-full animate-spin mx-auto"/>)
            :'Login'}
        </button>
    )
}