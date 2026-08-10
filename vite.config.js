import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load .env.local into process.env for local development
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/chat')) {
            if (req.method === 'POST') {
              let body = ''
              req.on('data', chunk => { body += chunk })
              req.on('end', async () => {
                try {
                  req.body = JSON.parse(body || '{}')
                  // Load the serverless handler
                  const apiPath = path.resolve(process.cwd(), 'api/chat.js')
                  const chatModule = await server.ssrLoadModule(apiPath)
                  
                  res.status = (code) => {
                    res.statusCode = code
                    return res
                  }
                  res.json = (data) => {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                    return res
                  }
                  
                  await chatModule.default(req, res)
                } catch (err) {
                  console.error('Local API handler error:', err)
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ 
                    error: "Sorry, I couldn't connect right now, please try again",
                    details: err.message 
                  }))
                }
              })
              return
            }
          }
          next()
        })
      }
    }
  ],
})
