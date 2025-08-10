import { config as baseConfig } from '@frame-by-frame/eslint-config/base';

const config = [
  ...baseConfig,
  {
    ignores: ['prisma/**'],
  },
];

export default config;
