import getInitialClient from "./getClient"

export const getProject = async (id: string) => {
    console.log(`id = ${id}`)
    if (id) {
        const { databases } = getInitialClient()
        const data = await databases.getDocument("6475e4e81155c46f87b6", "6475f82bb6f201570328", id)
        console.log(data)
        return data
    }
}