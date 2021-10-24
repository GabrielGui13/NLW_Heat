import "dotenv/config";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import { router } from "./routes";

const app = express();

app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`Usuario conectado no socket ${socket.id}`);
}); //on (event)

app.use(express.json()); //para fazer o parse das req para json
app.use(router);

app.get("/github", (req: Request, res: Response) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`, //busca o client id da nossa aplicacao criada no Github OAuth, o client id esta no env, e eh acessado pela lib dotenv
    );
}); //ao concluir a autenticação, o client eh redirecionado para /signin/callback

app.get("/signin/callback", (req: Request, res: Response) => {
    const { code } = req.query; //o github manda um codigo do usuario

    return res.json(code);
});

export { serverHttp, io }
