import stylistic from "@stylistic/eslint-plugin"
import next from "@next/eslint-plugin-next"

const eslintConfig = [
    {
        plugins: {
            "@stylistic": stylistic,
            "@next": next,
        },
        rules: {
            "@stylistic/indent": ["error", 4],
        }
    },
]

export default eslintConfig
