import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './openapi.json',    
  apiFile: './api.ts',        
  apiImport: 'api',                          
  outputFile: './generated.ts',    
  exportName: 'generatedApi',                     
  hooks: {queries: true, lazyQueries: true, mutations: true},                                    
  useEnumType: true,                                     
}

export default config