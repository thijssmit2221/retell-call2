import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (like index.html)

app.post('/api/start-call', async (req, res) => {
  try {
    const supabaseRes = await fetch('https://your-supabase-url.functions.supabase.co/start_retell_call-ts-', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await supabaseRes.json();
    res.json(data);
  } catch (error) {
    console.error('Error in /api/start-call:', error);
    res.status(500).json({ error: 'Failed to start call' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});