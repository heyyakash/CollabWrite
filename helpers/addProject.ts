import { ID, Models } from "appwrite"
import getInitialClient from "./getClient"
import { UserPreferences } from "typescript"

export const addProject = (projectName: string, data: Models.User<Models.Preferences>, mode: 'solo' | 'collab') => {

    const { databases } = getInitialClient()
    const project_id = ID.unique()
    const creation = databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_PROJECTS_COLLN as string, project_id, {
        admin: data?.email,
        users: [data["$id"]],
        name: projectName
    })
        .then(d => {
            if (mode !== "solo") {
                databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB as string, process.env.NEXT_PUBLIC_APPWRITE_DB_CHATS as string, ID.unique(), {
                    project_id: d["$id"]
                })
            }
            return {id:d["$id"],success:true}
        })
        .catch(err => {
            console.log(err)
            return {success:false}
        })
    return creation
}