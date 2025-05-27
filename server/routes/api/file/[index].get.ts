import '@dotenvx/dotenvx/config'
import { Client, Databases, Storage, Query } from "node-appwrite";

export default defineEventHandler(async (event) => {
    const client = new Client();

    client
        .setEndpoint(process.env.APPWRITE_URL)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY) // Your secret API key
    ;

    const storage = new Storage(client)
    const db = new Databases(client)

    const name = getRouterParam(event, 'index')
    const params = name.split("_")

    const docsList = await db.listDocuments(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_COLLECTION_FILES_ID,
        [
            Query.equal('filename', [`${name}.csv`])
        ]
    ).catch(e => e)

    const fileID = docsList.documents[0]['fileID'] 
    
    const file = await storage.getFileDownload(process.env.APPWRITE_BUCKET_ID, fileID)

    var enc = new TextDecoder("utf-8");
    const csv = enc.decode(file)
    
    return {
        "fileContent": csv
    };
});
