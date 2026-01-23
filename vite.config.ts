import { defineConfig } from 'vite';
import { execSync } from 'child_process';
import pkg from './package.json';

// Get Git Hash
let commitHash = '';
try {
    commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
    commitHash = 'dev';
}

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
        __COMMIT_HASH__: JSON.stringify(commitHash),
    },
    build: {
        outDir: 'dist',
    },
    test: {
        globals: true,
        environment: 'jsdom',
    },
});
