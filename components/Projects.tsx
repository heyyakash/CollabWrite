import { Account, Client, Databases, Query } from 'appwrite'
import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

const Projects = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
    const databases = new Databases(client)
    const queryClient = useQueryClient()
    const userData = queryClient.getQueryData("userData")
    const getProjects = async () => {
        try {
            const data = databases.listDocuments("6475e4e81155c46f87b6", "6475f82bb6f201570328",[Query.search("users",userData["$id"])])
            return data
        } catch (error) {
            return new Error()
        }
    }

    const {data:projects, error , isLoading} = useQuery("projects", getProjects)
    console.log(projects)

    return (
        <div>Projects</div>
    )
}

export default Projects