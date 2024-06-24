// pages/api/comment/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, age, content } = req.body;

    console.log('Received POST request:', { name, age, content });

    try {
      // Crear un nuevo usuario o encontrar uno existente
      const user = await prisma.user.upsert({
        where: { name },
        update: { age },
        create: { name, age },
      });

      console.log('User upserted:', user);

      // Crear un nuevo comentario asociado al usuario
      const comment = await prisma.comment.create({
        data: {
          content,
          userId: user.userId,
        },
      });

      console.log('Comment created:', comment);

      res.status(201).json({ comment, user });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Error creating comment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
