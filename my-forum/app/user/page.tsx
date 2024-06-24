
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';

const prisma = new PrismaClient();

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const users = await prisma.user.findMany();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.userId}>{user.name} ({user.age})</li>
        ))}
      </ul>
    </div>
  );
}
