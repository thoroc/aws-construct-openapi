import { JsonSchema, JsonSchemaType } from 'aws-cdk-lib/aws-apigateway';
import { getConfig, interfaceTemplate } from './schema';

describe('interfaceTemplate', () => {
  it('should return the correct ModelOptions', () => {
    const interfaceName = 'MyInterface';
    const schemaProps: JsonSchema = {
      type: JsonSchemaType.OBJECT,
      properties: {
        id: { type: JsonSchemaType.STRING },
        name: { type: JsonSchemaType.STRING },
      },
    };

    const expectedModelOptions = {
      contentType: 'application/json',
      modelName: 'MyInterfaceModel',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
        schema: 'http://json-schema.org/draft-07/schema#',
        title: 'MyInterfaceModel',
      },
    };

    const result = interfaceTemplate(interfaceName, schemaProps);

    expect(result).toEqual(expectedModelOptions);
  });
});

describe('getConfig', () => {
  it('should return the correct config object', () => {
    const tsconfig = 'tsconfig.json';
    const path = '/path/to/file';

    const expectedConfig = {
      path: '/path/to/file',
      tsconfig: 'tsconfig.json',
      type: '*',
    };

    const result = getConfig(tsconfig, path);

    expect(result).toEqual(expectedConfig);
  });
});
