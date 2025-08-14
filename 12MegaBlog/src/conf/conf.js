// const conf = {
//     appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
//     appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
//     appwriteDatabaseId: String (import.meta.DATABASE_ID),
//     appwriteCollectionId: String (import.meta.COLLECTION_ID),
//     appwriteBucketId: String (import.meta.BUCKET_ID),

// }


const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    // appwriteDocumentId: String(import.meta.env.VITE_APPWRITE_DOCUMENT_ID),
}

console.log("Appwrite Config:", conf);

export default conf

