// addPost.ts
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Adjust the path to your firebase config file

const addPost = async (title: string, text: string, img: string, yturl: string, videoUrl: string, audioUrl: string) => {
  try {
    await addDoc(collection(db, 'posts'), {
      title,
      text,
      img,
      yturl,
      videoUrl,
      audioUrl,
      createdAt: new Date()
    });
    console.log('Post added successfully');    
  } catch (error) {
    console.error('Error adding post: ', error);
  }
};

export default addPost;
