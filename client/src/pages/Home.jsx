import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="fade-in">
      <h1 className="title-gradient">Latest Posts</h1>
      {posts.length === 0 ? (
        <div className="empty-state">No posts available.</div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="card">
              <h2 style={{ marginBottom: '10px' }}>
                <Link to={`/post/${post._id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h2>
              <span className="post-meta">
                By {post.author ? post.author.username : 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <p style={{ color: '#cbd5e1' }}>{post.content.substring(0, 120)}...</p>
              <div style={{ marginTop: '20px' }}>
                <Link to={`/post/${post._id}`} className="nav-link" style={{ color: '#818cf8' }}>Read more →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
