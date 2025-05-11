declare const config: {
    root: boolean;
    extends: string[];
    parser: string;
    parserOptions: {
        project: string;
        sourceType: string;
    };
    plugins: string[];
    rules: {
        /**
         * Please keep this list alphabetically sorted, as well as sorted by namespace.
         */
        "arrow-body-style": string;
        "implicit-arrow-linebreak": string;
        "max-len": string;
        "no-param-reassign": string;
        "object-curly-newline": (string | {
            ImportDeclaration: string;
        })[];
        "operator-linebreak": string;
        "prefer-arrow-callback": (string | {
            allowNamedFunctions: boolean;
        })[];
        "react/jsx-one-expression-per-line": string;
        "react/jsx-indent": (string | number)[];
        "react/jsx-indent-props": (string | number)[];
        "react/jsx-boolean-value": string[];
        "react/prop-types": string[];
        "react/react-in-jsx-scope": string;
        "react/require-default-props": string;
        "react/no-unescaped-entities": (string | {
            forbid: string[];
        })[];
        "import/extensions": string;
        "import/prefer-default-export": string;
        "@typescript-eslint/comma-dangle": string;
        "@typescript-eslint/indent": (string | number)[];
        "@typescript-eslint/no-use-before-define": (string | {
            functions: boolean;
            classes: boolean;
            variables: boolean;
            allowNamedExports: boolean;
        })[];
        "@typescript-eslint/naming-convention": (string | {
            selector: string;
            modifiers: string[];
            format: string[];
        })[];
    };
};
export default config;
