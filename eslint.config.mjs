// eslint-config-next v16 ships native flat configs, so they are spread
// directly. Wrapping them in @eslint/eslintrc's FlatCompat — as the
// pre-v16 setup did — throws "Converting circular structure to JSON".
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
];

export default eslintConfig;
