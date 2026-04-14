import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      } catch (err) {
        setError('Error fetching post data');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`, 
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating post');
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="page-container fade-in">
      <div className="card form-card">
        <h2 className="title-gradient">Edit Post</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Post Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Write your content here..." 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required
              rows="10"
              className="styled-textarea"
            />
          </div>
          <button type="submit" className="btn btn-primary primary-gradient">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
