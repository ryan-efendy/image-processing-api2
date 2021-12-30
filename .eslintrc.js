module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    env: {
        es2021: true,
        node: true
    },
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:node/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier'
    ],
    rules: {
        'prettier/prettier': 2,
        'node/no-unsupported-features/es-syntax': 0,
        'node/no-missing-import': 0, // this is a bug in eslint-plugin-node
        'import/no-named-as-default': 0,
        'node/no-unpublished-import': 0
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    }
};
