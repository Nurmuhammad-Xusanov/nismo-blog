import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebase'; // Adjust the path to your firebase config file
import { styles } from '../utils/styles';
import YoutubeEmbed from './youtubeEmbed';
import VideoPlayer from './videoPlayer';
import { Loader2 } from "lucide-react";
// Import the VideoPlayer component

interface Post {
  title: string;
  text: string;
  img: string;
  yturl: string;
  videoUrl: string;
  audioUrl: string;
  createdAt: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return `${formattedTime} ${formattedDate}`;
}

const PostCard: React.FC<Post> = ({ title, text, img, createdAt, yturl, videoUrl, audioUrl }) => (
  <div className={`${styles.container} ${styles.paddingX} mt-5 pb-5`}>
    <h4 className={`${styles.heading4}`}>{title}</h4>
    <div className="flex gap-5 md:flex-nowrap flex-wrap mt-1">
      {audioUrl ? <audio controls>
        <source src={audioUrl} type='audio/mpeg' />
      </audio> : null}
      {yturl && <YoutubeEmbed embedId={yturl} />}
      {img && <img className="object-contain max-h-96" src={img} alt="image" />}
      {videoUrl && <VideoPlayer videoUrl={videoUrl} />} {/* Display video if videoUrl is present */}
      <p className="text-lightWhite">{text}</p>
    </div>
    <p className="text-right text-gray-500"> {formatDate(createdAt)}</p>
  </div>
);

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        setIsLoading(false)
        const postsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            createdAt: data.createdAt.toDate()
          } as Post;
        });
        setPosts(postsData);
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  console.log(isLoading);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) :
        posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))
      }
    </div>
  );
};

export default Posts;
