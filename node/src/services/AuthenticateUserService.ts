import axios from "axios"
import prismaClient from "../prisma"
import { sign } from 'jsonwebtoken' 
/* 
    Receber code(string)
    Recuperar o access_token no github
    Recuperar infos do user no github
    Verificar se o usuario existe no DB
    ---- Sim = Gera um token
    ---- Nao = Cria no DB, gera um token
    Retornar o token com as infos do user
*/

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService {
    async execute(code: string) { //code => lembrar que expira em pouco tempo, os erros de bad authorization podem ocorrer por causa disso
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_Secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                "Accept": "application/json"
            }
        }) //para retornar apenas o access_token

        const response = await axios.get<IUserResponse>("https://api.github/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        const { login, id, avatar_url, name } = response.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id
            }
        })

        return response.data;
    }
}

export { AuthenticateUserService }