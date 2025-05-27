import * as dotenv from "dotenv";
import { Client, Databases, Storage, Query } from "node-appwrite";

export default defineEventHandler(async (event) => {
    // const client = new Client();
    // const env = dotenv.config()['parsed']
    // console.log(env);
    

    // client
    //     .setEndpoint(env.APPWRITE_URL)
    //     .setProject(env.APPWRITE_PROJECT_ID)
    //     .setKey(env.APPWRITE_API_KEY) // Your secret API key
    // ;

    // const storage = new Storage(client)
    // const db = new Databases(client)

    // const docsList = await db.listDocuments(
    //     env.APPWRITE_DB_ID,
    //     env.APPWRITE_COLLECTION_FILES_ID,
    //     [
    //         Query.equal('filename', [`${name}.csv`])
    //     ]
    // ).catch(e => e)

    // const fileID = docsList.documents[0]['fileID'] 
    
    // const file = await storage.getFileDownload(env.APPWRITE_BUCKET_ID, fileID)
    
        // var enc = new TextDecoder("utf-8");
        // const csv = enc.decode(file)
    const paths = getRouterParam(event, 'index')
    console.log(paths);
    
    if (paths == "centroid_clipped" || paths == "burned_area_clipped") {
        const data = await useStorage('assets:server').getItem(`centroid_clipped.json`)
        return data
    }

    const params = paths.split("_")

    const data = await useStorage('assets:server').getItem(`${params[0]}/${params[1]}/${params[2]}.csv`)

    return {data: data}
});
