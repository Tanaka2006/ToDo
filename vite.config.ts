import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(() => {
  const isVercel = process.env.VERCEL === '1';
  const isDev = process.env.NODE_ENV === 'development';
  const base = isVercel || isDev ? '/' : '/ToDo/';
  
  console.log('🔧 Vite Config:', { isVercel, isDev, base, NODE_ENV: process.env.NODE_ENV });
  
  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      // アセット読み込み最適化
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
  };
});
