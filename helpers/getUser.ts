import { Account } from "appwrite";

const getClient = async (account: Account) => {
    const promise = await account.get();
    return promise
}

export default getClient