const config = {
    root: true,
    extends: [
        "airbnb",
        "airbnb/hooks",
        "airbnb-typescript",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        // tsconfigRootDir: ,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
        /**
         * Please keep this list alphabetically sorted, as well as sorted by namespace.
         */

        // Once you have two nested functions with no brackets, the code becomes unreadable.
        "arrow-body-style": "off",

        // Conflicts with Prettier line-length rules.
        "implicit-arrow-linebreak": "off",

        // JSX can get a little long, so we extend the max code line length a little.
        "max-len": "off",

        // Requires an exception every time Array.reduce() is used
        "no-param-reassign": "off",

        // Don't require `import {a,b,c,d} from module` to be multi-line.
        "object-curly-newline": ["error", { ImportDeclaration: "never" }],

        // Conflicts with prettier -- Do not enforce operators to be at the beginning of a line (&&, ||, etc.)
        "operator-linebreak": "off",

        // When writing imperative ref components, it's clearer to explictly name our callbacks.
        "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],

        // Prevents everyday concatenation like `{user.first} {user.last}`
        "react/jsx-one-expression-per-line": "off",

        // Set to 4 spaces for JSX + TSX files.
        "react/jsx-indent": ["error", 4],

        // Set to 4 spaces for multi-line component props in JSX + TSX files.
        "react/jsx-indent-props": ["error", 4],

        // Require <bob frank={true} /> instead of <bob frank />
        "react/jsx-boolean-value": ["error", "always"],

        // This older pattern of defining default property types is made obsolete with Typescript.
        "react/prop-types": ["off"],

        // Conflicts with Typescript, which uses TSX files.
        "react/react-in-jsx-scope": "off",

        // Legacy from class components; Conflicts with functional components.
        "react/require-default-props": "off",

        // Removed apostrophes and double quotes from the forbidden list. '{"I\'ve"}' is harder to read than 'I've'.
        "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],

        // Typescript is already validating the existence of imported modules, so there's no benefit in an explicit file type.
        "import/extensions": "off",

        // Named exports are preferable for safety and consistent imports across components.
        "import/prefer-default-export": "off",

        // Let's not enforce trailing commas in function params and arrays.
        "@typescript-eslint/comma-dangle": "off",

        // Set to 4 spaces for all TS files.
        "@typescript-eslint/indent": ["error", 4],

        // Makes for messy TSX files with all helper functions above the actual component.
        "@typescript-eslint/no-use-before-define": [
            "error",
            {
                functions: false,
                classes: true,
                variables: true,
                allowNamedExports: true,
            },
        ],

        // Our resources send back JSON data with many snake_case'd properties ( i.e: game_state ), so we extend the acceptable formats to include snake_case.
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "variable",
                modifiers: ["destructured"],
                format: ["camelCase", "PascalCase", "snake_case"],
            },
        ],
    },
};

export default config;
