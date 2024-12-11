// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        minify: false, // Disable minification
        terserOptions: {
            compress: false,
            mangle: false,
        },
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'), // Entry point of your library
            name: 'MyLibrary', // Global variable name for UMD/IIFE builds
            fileName: (format) => `my-library.${format}.js`, // Output file name
            formats: ['es', 'cjs', 'umd', 'iife', 'system'], // Build formats
            
        },
        rollupOptions: {
            // Ensure to externalize dependencies that shouldn't be bundled
        },
    },
});