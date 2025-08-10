import { config as baseConfig } from '@frame-by-frame/eslint-config/base';
import eslintPrettierPluginRecommended from 'eslint-plugin-prettier/recommended';

const config = [...baseConfig, eslintPrettierPluginRecommended];

export default config;
