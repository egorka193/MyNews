/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
  schemaFile: './src/shared/api/openapi.json',
  apiFile: './src/shared/api/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFile: './src/shared/api/generated.ts', 
  exportName: 'generatedApi',
  hooks: true,
  tag: true,
}

module.exports = config