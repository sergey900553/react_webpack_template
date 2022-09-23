module.exports = {
    env: {
        browser: true,
        es2021: true,
    },

    extends: [

       "eslint-config-react-app/base",
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
    ],
    rules: {
        "import/no-shit": "off",
        "no-var": "error",
        quotes: ["warn", "double"]
    },

};
