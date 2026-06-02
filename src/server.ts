import express from 'express'

// Create Express application
const app = express()

// Health check endpoint - always good to have!
app.get('/health', (req, res) => {
  res.status(200).send('<button>Click Me</button>')
})

// Export the app for use in other modules (like tests)
export { app }

// Default export for convenience
export default app