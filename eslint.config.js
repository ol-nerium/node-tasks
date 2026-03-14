import globals from 'globals';
import { defineConfig } from 'eslint/config';
import pluginJs from '@eslint/js';

export default defineConfig([
    pluginJs.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: { globals: globals.node },
        rules: {
            semi: ['error', 'always'],
            'no-unused-vars': ['error', { args: 'none' }],
            'no-undef': 'error',
        },
    },
]);
