const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Conversation Session API');
});

// All sessions
app.get('/api/conversations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM conversation_session ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching sessions:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Session by ID
app.get('/api/conversations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM conversation_session WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching session by ID:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
