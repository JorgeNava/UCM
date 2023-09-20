import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { bearerAuth } from 'hono/bearer-auth'

export const config = {
  runtime: 'edge',
}

const app = new Hono().basePath('/api')

app.get('/', (c) => c.json({ message: 'Hello Hono!' }))

const token = process.env.TOKEN ? process.env.TOKEN : '';
app.use('/auth/*', bearerAuth({ token }))

app.get('auth/page', (c) => {
  return c.text('you are authorized')
})

export default handle(app)
