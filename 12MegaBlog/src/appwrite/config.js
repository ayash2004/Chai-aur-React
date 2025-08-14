import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // async createPost({ title, slug, content, featuredImage, status, userId }) {
    //     try {
    //         // Add validation
    //         if (!userId) {
    //             throw new Error("userId is required to create a post");
    //         }

    //         console.log("Creating post with userId:", userId); // Debug log

    //         return await this.databases.createDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredImage,
    //                 status,
    //                 userId,
    //             }
    //         );
    
    //     } catch (error) {
    //         console.log("Appwrite Service :: createPost :: error", error);
    //         throw error; // Re-throw so PostForm can handle it
    //     }
    // }



//     async createPost({ title, slug, content, featuredImage, status, userId }) {
//     try {
//         console.log('=== CREATE POST SERVICE START ===');
        
//         // Enhanced validation and logging
//         console.log('Input parameters:', {
//             title,
//             slug,
//             content,
//             featuredImage,
//             status,
//             userId
//         });
        
//         // Validate required fields
//         if (!userId) {
//             console.error("❌ userId is missing:", userId);
//             throw new Error("userId is required to create a post");
//         }
        
//         if (!title) {
//             console.error("❌ title is missing:", title);
//             throw new Error("title is required to create a post");
//         }
        
//         if (!slug) {
//             console.error("❌ slug is missing:", slug);
//             throw new Error("slug is required to create a post");
//         }
        
//         if (!content) {
//             console.error("❌ content is missing:", content);
//             throw new Error("content is required to create a post");
//         }

//         // Check configuration values
//         console.log('Configuration check:', {
//             databaseId: conf.appwriteDatabaseId,
//             collectionId: conf.appwriteCollectionId,
//             hasDatabase: !!this.databases
//         });

//         if (!conf.appwriteDatabaseId || !conf.appwriteCollectionId) {
//             console.error("❌ Missing Appwrite configuration");
//             throw new Error("Database configuration is missing");
//         }

//         if (!this.databases) {
//             console.error("❌ Databases client not initialized");
//             throw new Error("Database client not initialized");
//         }

//         console.log("✅ All validations passed. Creating document...");

//         const documentData = {
//             title,
//             content,
//             featuredImage,
//             status,
//             userId,
//         };

//         console.log("Document data to create:", documentData);
//         console.log("Using slug as document ID:", slug);

//         const result = await this.databases.createDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             slug,
//             documentData
//         );

//         console.log("✅ Document created successfully:", result);
//         return result;

//     } catch (error) {
//         console.error("=== CREATE POST ERROR ===");
//         console.error("Error type:", error.constructor.name);
//         console.error("Error message:", error.message);
//         console.error("Error code:", error.code);
//         console.error("Error type:", error.type);
//         console.error("Full error object:", error);
        
//         // Log specific Appwrite errors
//         if (error.code === 400) {
//             console.error("❌ Bad Request - Check your data format");
//         } else if (error.code === 401) {
//             console.error("❌ Unauthorized - Check authentication");
//         } else if (error.code === 404) {
//             console.error("❌ Not Found - Check database/collection IDs");
//         } else if (error.code === 409) {
//             console.error("❌ Conflict - Document with this slug already exists");
//         } else if (error.code === 413) {
//             console.error("❌ Payload too large - Check content size");
//         }
        
//         throw error; // Re-throw so PostForm can handle it
//     }
// }

//     async createPost({ title, slug, content, featuredImage, status, userId }) {
//     try {
//         console.log('=== CREATE POST SERVICE START ===');
        
//         // Enhanced validation and logging
//         console.log('Input parameters:', {
//             title,
//             slug,
//             content,
//             featuredImage,
//             status,
//             userId
//         });
        
//         // Validate required fields
//         if (!userId) {
//             console.error("❌ userId is missing:", userId);
//             throw new Error("userId is required to create a post");
//         }
        
//         if (!title) {
//             console.error("❌ title is missing:", title);
//             throw new Error("title is required to create a post");
//         }
        
//         if (!slug) {
//             console.error("❌ slug is missing:", slug);
//             throw new Error("slug is required to create a post");
//         }
        
//         if (!content) {
//             console.error("❌ content is missing:", content);
//             throw new Error("content is required to create a post");
//         }

//         // Check configuration values
//         console.log('Configuration check:', {
//             databaseId: conf.appwriteDatabaseId,
//             collectionId: conf.appwriteCollectionId,
//             hasDatabase: !!this.databases
//         });

//         if (!conf.appwriteDatabaseId || !conf.appwriteCollectionId) {
//             console.error("❌ Missing Appwrite configuration");
//             throw new Error("Database configuration is missing");
//         }

//         if (!this.databases) {
//             console.error("❌ Databases client not initialized");
//             throw new Error("Database client not initialized");
//         }

//         console.log("✅ All validations passed. Creating document...");

//         const documentData = {
//             title,
//             content,
//             featuredImage,
//             status,
//             userId,
//         };

//         console.log("Document data to create:", documentData);
//         console.log("Using slug as document ID:", slug);

//         const result = await this.databases.createDocument(
//             conf.appwriteDatabaseId,
//             conf.appwriteCollectionId,
//             slug,
//             documentData
//         );

//         console.log("✅ Document created successfully:", result);
//         return result;

//     } catch (error) {
//         console.error("=== CREATE POST ERROR ===");
//         console.error("Error type:", error.constructor.name);
//         console.error("Error message:", error.message);
//         console.error("Error code:", error.code);
//         console.error("Error type:", error.type);
//         console.error("Full error object:", error);
        
//         // Log specific Appwrite errors
//         if (error.code === 400) {
//             console.error("❌ Bad Request - Check your data format");
//         } else if (error.code === 401) {
//             console.error("❌ Unauthorized - Check authentication");
//         } else if (error.code === 404) {
//             console.error("❌ Not Found - Check database/collection IDs");
//         } else if (error.code === 409) {
//             console.error("❌ Conflict - Document with this slug already exists");
//         } else if (error.code === 413) {
//             console.error("❌ Payload too large - Check content size");
//         }
        
//         throw error; // Re-throw so PostForm can handle it
//     }
// }   

    async updatePost (slug, {title, content, featuredImage, status})  {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {
                    title, 
                    content,
                    featuredImage, 
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        // console.log(appwriteCollectionId);
        
        try {
            console.log("Deleting post with ID:", slug);

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  //this is the Document ID
                
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false;
        }       
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, 
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
        }
    }

    async getPosts (queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return false
        }
    }

    // File Upload Service 

    async uploadFile(file){

        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false
        }
        
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error)
        }
    }

    // getFileView(fileId){
    //     return this.bucket.getFileView(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }
    getFileView(fileId, width = 400, height = 300) {
    try {
        const url = this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId,
            width,
            height,
            'center',
            80,
            0, // border radius
            '000000', // background color
            'png' // output format
        );
        
        console.log('Generated URL:', url.toString());
        return url.toString();
    } catch (error) {
        console.error('Error in getFileView:', error);
        return null;
    }
}
//         getFileView(fileId) {
//     try {
//         // Use getFileView instead of getFileView
//         return this.bucket.getFileView(conf.appwriteBucketId, fileId);
//     } catch (error) {
//         console.error('Error getting file view:', error);
//         return null;
//     }
// }
       
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
}
console.log("Appwrite config:", conf);


const service= new Service()

export default service

console.log("Appwrite Config:", conf);
