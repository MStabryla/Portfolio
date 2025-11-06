import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default ({mode}) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [vue()],
    server: {
      port: parseInt(process.env.VITE_PORT) ?? 3001
    }
  });
}
