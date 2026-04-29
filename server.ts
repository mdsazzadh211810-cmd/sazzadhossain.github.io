import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple proxy mechanism to bypass VPN restrictions for Google Drive images/files
  app.get('/api/proxy', async (req, res) => {
    try {
      const targetUrl = req.query.url;
      if (!targetUrl || typeof targetUrl !== 'string') {
        res.status(400).send('Missing url parameter');
        return;
      }
      
      const parsedUrl = new URL(targetUrl);
      // Optional security: ensure we only proxy allowed domains
      if (!['drive.google.com'].includes(parsedUrl.hostname)) {
        res.status(403).send('Domain not allowed for proxying');
        return;
      }

      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        res.status(response.status).send(`Failed to fetch: ${response.statusText}`);
        return;
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }
      
      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition) {
        res.setHeader('Content-Disposition', contentDisposition);
      }
      
      if (response.body) {
        const bodyReader = response.body.getReader();
        while (true) {
          const { done, value } = await bodyReader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      } else {
        res.end();
      }
    } catch (err) {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy rendering error');
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Determine __dirname for ES modules or CJS
    const __dirname = path.resolve();
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
