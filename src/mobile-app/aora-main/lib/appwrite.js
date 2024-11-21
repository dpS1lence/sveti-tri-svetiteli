import { Client, Databases, ID, Storage } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.s.s",
  projectId: "s",
  databaseId: "s",
  storageId: "s",
  postsCollectionId: "s",
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
  if (!file) return null;

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
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
    //const { fileUrl } = await uploadFile(imageFile);

    // Then create the post document
    const post = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        title,
        description,
        imageurl: "fileUrl",
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

    return posts.documents;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
