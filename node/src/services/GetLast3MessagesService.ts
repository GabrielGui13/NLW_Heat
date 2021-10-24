import prismaClient from "../prisma";

class GetLast3MessagesService {
    async execute() {
        const messages = await prismaClient.message.findMany({
            take: 3, //limite de dados
            orderBy: {
                created_at: "desc" //mais nova pra mais velha
            },
            include: {
                user: true //para retornar o usuario
            }
        })

        // SELECT * MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC

        return messages;
    }
}

export { GetLast3MessagesService };