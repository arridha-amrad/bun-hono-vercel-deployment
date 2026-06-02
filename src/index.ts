import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/client.js';
import withPrisma from './lib/prisma.js';

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient; 
  }; 
}; 

const app = new Hono<ContextWithPrisma>()

const welcomeStrings = [
  'Hello Hono!',
  'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono'
]

app.get('/', (c) => {
  return c.text(welcomeStrings.join('\n\n'))
})

app.get("/users", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  return c.json({ users });
});

export default app
