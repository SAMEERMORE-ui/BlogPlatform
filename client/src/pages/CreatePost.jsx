import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/posts', 
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="card form-card">
        <h2 className="title-gradient">Create New Post</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Content..." 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required
              rows="10"
              className="styled-textarea"
            />
          </div>
          <button type="submit" className="btn btn-primary primary-gradient">Publish</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
