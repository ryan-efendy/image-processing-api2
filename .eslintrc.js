module.exports = {
    "root": true,
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "env": {
        "es2021": true,
        "node": true
    },
    "plugins": [
        '@typescript-eslint',
        'import',
        'prettier'
    ],
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:node/recommended',
        'plugin:import/recommended',
        'prettier',
    ],
    "rules": {
        'prettier/prettier': 2
    },
}