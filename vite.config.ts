import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-large-pdfs',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/magazines/') && req.url.endsWith('.pdf')) {
            const cleanUrl = req.url.split('?')[0];
            const filePath = path.join(__dirname, 'public', cleanUrl);
            if (fs.existsSync(filePath)) {
              const stat = fs.statSync(filePath);
              res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Length': stat.size,
                'Accept-Ranges': 'bytes',
              });
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5188,
    watch: {
      ignored: ['**/Resources/**', '**/*.pdf'],
    },
  },
});

