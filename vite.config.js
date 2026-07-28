import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'home.html'),
        nexus: resolve(__dirname, 'nexus.html'),
        vaultSpin: resolve(__dirname, 'nexus/games/vault-spin.html'),
        signalBreak: resolve(__dirname, 'nexus/games/signal-break.html'),
        vaultKeys: resolve(__dirname, 'nexus/games/vault-keys.html'),
      },
    },
  },
});
