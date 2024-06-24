'use client';

import { useState } from 'react';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age }),
    });

    if (res.ok) {
      // Handle successful creation
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={age}
        onChange={e => setAge(e.target.value)}
        placeholder="Age"
      />
      <button type="submit">Create User</button>
    </form>
  );
}
