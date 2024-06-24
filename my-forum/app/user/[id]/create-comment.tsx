'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateComment({ userId }: { userId: number }) {
  const [content, setContent] = useState('');
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const res = await fetch(`/api/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content }),
    });

    if (res.ok) {
      router.push(`/user/${userId}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add your comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
