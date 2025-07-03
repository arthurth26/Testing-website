import React from 'react';
import { useSearch } from '../routes/searchContext';

interface Post {
    id: number;
    title: string;
    summary: string;
    content: string;
}

interface PostData {
    Posts: Post[];
}

async function fetchPostData(): Promise<PostData> {
    try {
        const response = await fetch('/posts.json');
        if (!response.ok) 
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        const data: PostData = await response.json();
        return data;
        } 
    catch (error) 
        { 
            console.error('Error fetching post data:', error);
            throw error;
        }
}


export default function BlogPost() {
    const [post, setPost] = React.useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = React.useState<Post | null>(null)
    const {searchTerm} = useSearch();

    React.useEffect(() => {
        fetchPostData()
            .then(data => setPost(data.Posts))
            .catch(error => console.error('Error fetching blog posts:', error));
    }, []);

    const filteredPosts = post.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
    };

    const closePopup = () => {
        setSelectedPost(null);
    };

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        closePopup();
    };

    const handleContentClick = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => handlePostClick(post)}
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.summary}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts found.</p>
        )}
      </div>

      {/* Popup for Selected Post */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10"
          onClick={handleBackgroundClick}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative"
            onClick={handleContentClick}
          >
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <button
              onClick={closePopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}