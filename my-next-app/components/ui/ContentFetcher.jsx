import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContentFetcher = () => {
  const [content, setContent] = useState({ title: '', body: '' });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/content')
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
        console.error('Error fetching the content:', error);
      });
  }, []);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
    </div>
  );
};

export default ContentFetcher;
