export default {
  '*/**/*.{ts,tsx,js,json,md}': 'prettier --write',
  '*/**/*.{ts,tsx}': 'eslint --fix',
};
