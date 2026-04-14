import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching post', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!post) return <div className="empty-state">Post not found</div>;

  return (
    <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" className="nav-link" style={{ display: 'inline-block', marginBottom: '20px' }}>← Back to Home</Link>
      <div className="card">
        <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{post.title}</h1>
        <span className="post-meta" style={{ fontSize: '1rem' }}>
          By {post.author ? post.author.username : 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <div className="post-content" style={{ marginTop: '30px' }}>
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default Post;
