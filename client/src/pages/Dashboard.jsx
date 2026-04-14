import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        // Filter by author on frontend
        const userPosts = res.data.filter(post => post.author && post.author._id === user.id);
        setPosts(userPosts);
      } catch (err) {
        console.error('Error fetching posts', err);
      }
    };
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(posts.filter(post => post._id !== id));
      } catch (err) {
        console.error('Error deleting post', err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/post/edit/${id}`);
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 className="title-gradient" style={{ marginBottom: 0 }}>My Dashboard</h2>
        <Link to="/post/new" className="btn btn-primary primary-gradient btn-small">Create New Post</Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="empty-state">You have no posts. Create one!</div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="card">
              <h3 style={{ marginBottom: '10px' }}>{post.title}</h3>
              <p style={{ color: '#cbd5e1' }}>{post.content.substring(0, 100)}...</p>
              <div className="actions-row">
                <button onClick={() => handleEdit(post._id)} className="btn btn-outline btn-small">Edit</button>
                <button onClick={() => handleDelete(post._id)} className="btn btn-danger btn-small">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
