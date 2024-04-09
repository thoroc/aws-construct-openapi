import { JsonSchema, JsonSchemaType } from 'aws-cdk-lib/aws-apigateway';
import { interfaceTemplate } from './schema';

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
