module.exports = {
  "printWidth": 140,
  "trailingComma": "all",
  "singleQuote": true,
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true,
  "plugins": [require.resolve("@trivago/prettier-plugin-sort-imports")],
  "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^([.\/]).*(?<!scss)$", "^.*(.scss)$"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
