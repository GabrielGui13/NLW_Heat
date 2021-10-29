import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from '../services/api';

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

type AuthProvider = {
    children: ReactNode;
};

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
};

type AuthContextData = {
    user: User | null;
    signInUrl: string;
    signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProvider) {
    const [user, setUser] = useState<User | null>(null)

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=f63f96289be4fe17659f`;

    const signIn = async (githubCode: string) => {
        const response = await api.post<AuthResponse>("authenticate", {
            code: githubCode,
        });

        const { token, user } = response.data;

        localStorage.setItem("@dowhile:token", token);

        setUser(user);
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem("@dowhile:token");
    }

    useEffect(() => { //checa se ja ha usuario registrado na apliacacao
        const token = localStorage.getItem("@dowhile:token");

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}` //define nos headers como padrao o token

            api.get<User>('profile')
                .then(res => {
                    setUser(res.data)
                })
        }
    }, [])
    
    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes("?code=");

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split("?code=");

            window.history.pushState({}, "", urlWithoutCode); //para nao aparecer a query params na url do user

            signIn(githubCode);
        }
    }, []); //roda apenas uma vez no load

    return (
        // faz com que todos os outros componentes que estejam dentro dele tenham acesso a informacao do contexto
        <AuthContext.Provider value={{ signInUrl, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

/* 
    - o AuthContext.Provider exportado envolve o <App/>
    - a partir disso toda a aplicacao tem acesso ao context com useContext
    - dentro do useContext eh inserido o AuthContext, que eh um createContext({}) com oq seria o contexto dele dentro dele em type
    - o valor do contexto eh alterado na props value do AuthContext.Provider
    - o useEffect eh disparado no load da pagina, que checa se ha o codigo na url, se nao tiver nao faz nada
    - se houver codigo na url, eh feito uma requisicao pro backend para buscar os dados do usuario
    - os dados do usuario sao setados em um useState
    - apos isso, o user que estava no value do AuthContext.Provider eh atualizado
    - o que define se existe um usuario eh o token e o context
*/

