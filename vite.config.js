import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    {
      name: 'decode-url-ids',
      resolveId(id) {
        if (!id || !id.includes('%')) return null;
        try {
          const decoded = decodeURIComponent(id);
          if (path.isAbsolute(decoded)) {
            return decoded;
          }
          const clean = decoded.replace(/^\/+/, '');
          return path.resolve(__dirname, clean);
        } catch (_) {
          return null;
        }
      },
    },
    {
      name: 'treat-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        const cleanId = decodeURIComponent(id.split('?')[0].split('#')[0]);
        if (
          !cleanId.includes('node_modules') &&
          cleanId.endsWith('.js') &&
          (cleanId.includes('pages') || cleanId.includes('src') || cleanId.includes('user') || cleanId.includes('admin'))
        ) {
          return transformWithEsbuild(code, cleanId, {
            loader: 'jsx',
          });
        }
        return null;
      },
    },
    react(),
  ],
  resolve: {
    alias: [
      { find: '@user', replacement: path.resolve(__dirname, 'user') },
      { find: '@admin', replacement: path.resolve(__dirname, 'admin') },
    ],
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'lucide-react',
      'firebase/app',
      'firebase/database',
    ],
  },
  server: {
    port: 3000,
    strictPort: true,
    host: '127.0.0.1',
    open: false,
  },
});
