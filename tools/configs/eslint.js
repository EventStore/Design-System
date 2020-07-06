module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'no-undef': 0,
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
            },
        ],
        'no-console': 2,
        'no-restricted-syntax': [
            1,
            {
                selector: 'ExportDefaultDeclaration',
                message: 'Prefer named exports',
            },
        ],
        '@typescript-eslint/ban-types': [
            1,
            {
                types: {
                    object: false,
                },
                extendDefaults: true,
            },
        ],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-object-literal-type-assertion': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 0,
            },
        },
    ],
};
