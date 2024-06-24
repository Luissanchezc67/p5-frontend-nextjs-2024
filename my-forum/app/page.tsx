'use client';

import { useState, useEffect } from 'react';  // Importar useEffect desde 'react'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function HomePage() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [content, setContent] = useState('');

  async function fetchComments() {
    const res = await fetch('/api/comments');
    const data = await res.json();
    setComments(data);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const res = await fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age, content }),
    });

    if (res.ok) {
      setName('');
      setAge('');
      setContent('');
      fetchComments(); // Refrescar la lista de comentarios
    }
  }

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Welcome to the Forum</h1>
      <p>This is a forum where you can read and leave comments.</p>

      <h2>Recent Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>
            <p>
              <strong>{comment.user.name} (Age: {comment.user.age}):</strong> {comment.content}
            </p>
            <p>{new Date(comment.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <h2>Leave a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
