import React, { useState, FormEvent, ChangeEvent } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import addPost from './addPost'; // Adjust the path to your addPost function
import { storage } from '../firebase/firebase'; // Adjust the path to your firebase config file
import { styles } from '../utils/styles';
import Navbar from './navbar';

const extractYouTubeVideoID = (url: string): string | null => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const PostForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [yturl, setYturl] = useState<string>('');
  const [audioFile, setaudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setISLaoading] = useState(false)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    setISLaoading(true)
    e.preventDefault();

    let imageUrl = img;
    let videoUrl = '';
    let audioUrl = '';

    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    if (videoFile) {
      const videoRef = ref(storage, `videos/${videoFile.name}`);
      await uploadBytes(videoRef, videoFile);
      videoUrl = await getDownloadURL(videoRef);
    }
    if (audioFile) {
      const audioRef = ref(storage, `auidos/${audioFile.name}`);
      await uploadBytes(audioRef, audioFile);
      audioUrl = await getDownloadURL(audioRef)
    }

    try {
      await addPost(title, text, imageUrl, yturl, videoUrl, audioUrl);
      setTitle('');
      setText('');
      setImg('');
      setYturl('');
      setImageFile(null);
      setVideoFile(null);
      setaudioFile(null);
      (null);
      setISLaoading(false);
    } catch (error) {
      console.error('Error adding post:', error);
      setISLaoading(false);
    }
  };

  const handleYouTubeURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const videoID = extractYouTubeVideoID(e.target.value);
    setYturl(videoID || '');
  };

  return (
    <>
      <Navbar />
      <div className={`text-white flex-wrap flex ${styles.container} ${styles.paddingX}`}>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-4'>
            <label>Title:</label>
            <input
              className={`post-input`}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='flex gap-4 flex-wrap mt-[20px] items-center'>
            <label>Text:</label>
            <textarea
              className={`post-area`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className={` flex mt-[20px] flex-wrap gap-4`}>
            <label>Image URL:</label>
            <input
              type="text"
              className={`input-url`}
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Or upload an image"
            />
          </div>
          <div className={` flex mt-[20px] flex-wrap gap-4`}>
            <label>YouTube URL:</label>
            <input
              type="text"
              className={`input-url`}
              value={yturl}
              onChange={handleYouTubeURLChange}
              placeholder="Enter video link"
            />
          </div>
          <div className={`flex mt-[20px] flex-wrap gap-4`}>
            <label>Upload Image:</label>
            <input
              className={`file-upload`}
              type="file"
              onChange={(e) => handleFileChange(e, setImageFile)}
            />
          </div>
          <div className={`flex mt-[20px] flex-wrap gap-4`}>
            <label>Upload Video:</label>
            <input
              className={`file-upload`}
              type="file"
              onChange={(e) => handleFileChange(e, setVideoFile)}
            />
          </div>
          <div className={`flex mt-[20px] flex-wrap gap-4`}>
            <label>Upload Audio:</label>
            <input
              className={`file-upload`}
              type="file"
              onChange={(e) => handleFileChange(e, setaudioFile)}
            />
          </div>
          <button disabled={isLoading} className={`add-btn mt-[20px]`} type="submit">Add Post</button>
        </form>
      </div>
    </>
  );
};

export default PostForm;
