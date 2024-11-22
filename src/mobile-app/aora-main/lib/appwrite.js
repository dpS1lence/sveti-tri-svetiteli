import { Client, Databases, ID, Storage } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
  postsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_POSTS_COLLECTION_ID,
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const databases = new Databases(client);
const storage = new Storage(client);

// Upload file to storage
export async function uploadFile(file) {
  if (!file || !file.uri) return null;

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      {
        name: file.name,
        type: file.mimeType,
        size: file.size,
        uri: file.uri,
      }
    );

    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      uploadedFile.$id,
      2000,
      2000,
      "top",
      100
    );

    return {
      fileId: uploadedFile.$id,
      fileUrl,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Create a new post
export async function createPost({ title, description, imageFile }) {
  try {
    // First upload the image
    const { fileUrl } = await uploadFile(imageFile);

    // Then create the post document
    const post = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        title,
        description,
        imageurl: fileUrl,
        createdat: new Date().toISOString(),
      }
    );

    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// Get all posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId
    );
    console.log(posts.documents);
    return posts.documents;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
