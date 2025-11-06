const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

// ✅ ROUTES
app.use('/api/auth', require('./routes/auth'))
app.use('/api/reports', require('./routes/reports')) // ← Protected with auth
app.use('/api/admin', require('./routes/admin'))    // ← Protected with adminAuth

// Health check
// In your backend (server.js or routes)
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection specifically
    const result = await prisma.$queryRaw`SELECT 1 as connection_test`;
    
    res.json({ 
      status: 'OK', 
      server: 'Running',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'Error', 
      server: 'Running',
      database: 'Connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 API Ready: http://localhost:${PORT}`)
})