import conf from "../conf.js"

import { Client, ID, Databases, Query, Storage } from "appwrite";

/*Creating a Service class */
export class Service{
client=new Client();
account;
databases;
bucket;

/*Constructor for services */
constructor(){
    this.client
    .setEndpoint(conf.endpoint)
    .setProject(conf.project)
    this.account=new Account(this.client)
    this.databases=new Databases(this.client)
    this.bucket=new Storage(this.client)
}

/*Method for creating database */
async createPost({title,content,slug,featuredImage,userID,status}){
    try{
     return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
        {
         title,
         content,
         featuredImage,
         userID,
         status
     })     
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
    }
}

/*Method for updating database */
async updatePost(slug,{title,content,slug,featuredImage,status}){
    try{
     return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
        {
         title,
         content,
         featuredImage,
         status
     })     
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
    }
}

/*Method for deleting database */
async deletePost(slug){
    try{
      await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)   
      return true;  
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
        return false;
    }
}

/*Method for getting post */
async getPost(slug){
    try{
     return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)     
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
        return false;
    }
}

/*Method for getting the complete list */
async getPosts(queries=[Query.equal("status","active")]){
    try{
     return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)     
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
        return false;
    }
}

/*Method for uploading file */
async uploadFile(file){
    try{
     return await this.bucket.createFile(conf.appwritebucketId,ID.unique(),file)     
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
        return false;
    }
}

/*Method for deleting file */
async deleteFile(fileID){
    try{
     await this.bucket.deleteFile(conf.appwritebucketId,fileID)   
     return true;  
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
        return false;
    }
}
async getFilePreview(fileID){
    try{
     return this.bucket.getFilePreview(conf.appwriteBucketId,fileID)     
    }
    catch(error){
        console.log("Appwrite service :: logout",error) 
        return false;
    }
}
}

const service= new Service();
export default service;