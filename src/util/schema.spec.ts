import { JsonSchema, JsonSchemaType } from 'aws-cdk-lib/aws-apigateway';
import {
  getConfig,
  hasAdditionalProperties,
  hasRef,
  interfaceTemplate,
  updateApiRefs,
} from './schema';

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

describe('hasRef', () => {
  it('should return true if the object has "ref" or "$ref" property', () => {
    // Test case 1: Object with "ref" property
    const obj1 = { ref: 'someRef' };
    expect(hasRef(obj1)).toBe(true);

    // Test case 2: Object with "$ref" property
    const obj2 = { $ref: 'someRef' };
    expect(hasRef(obj2)).toBe(true);

    // Test case 3: Object with both "ref" and "$ref" properties
    const obj3 = { ref: 'someRef', $ref: 'someOtherRef' };
    expect(hasRef(obj3)).toBe(true);
  });

  it('should return false if the object does not have "ref" or "$ref" property', () => {
    // Test case 1: Empty object
    const obj1 = {};
    expect(hasRef(obj1)).toBe(false);

    // Test case 2: Object without "ref" or "$ref" property
    const obj2 = { name: 'John Doe', age: 30 };
    expect(hasRef(obj2)).toBe(false);
  });

  it('should return false if the input is not an object', () => {
    // Test case 1: Null input
    const obj1 = null;
    expect(hasRef(obj1)).toBe(false);

    // Test case 2: Number input
    const obj2 = 123;
    expect(hasRef(obj2)).toBe(false);

    // Test case 3: String input
    const obj3 = 'test';
    expect(hasRef(obj3)).toBe(false);
  });
});

describe('hasAdditionalProperties', () => {
  it('should return true if the object has "additionalProperties" property', () => {
    // Test case 1: Object with "additionalProperties" property
    const obj1 = { additionalProperties: true };
    expect(hasAdditionalProperties(obj1)).toBe(true);

    // Test case 2: Object with "additionalProperties" property set to false
    const obj2 = { additionalProperties: false };
    expect(hasAdditionalProperties(obj2)).toBe(true);

    // Test case 3: Object with "additionalProperties" property set to null
    const obj3 = { additionalProperties: null };
    expect(hasAdditionalProperties(obj3)).toBe(true);

    // Test case 4: Object with "additionalProperties" property set to an object
    const obj4 = { additionalProperties: { key: 'value' } };
    expect(hasAdditionalProperties(obj4)).toBe(true);
  });

  it('should return false if the object does not have "additionalProperties" property', () => {
    // Test case 1: Empty object
    const obj1 = {};
    expect(hasAdditionalProperties(obj1)).toBe(false);

    // Test case 2: Object without "additionalProperties" property
    const obj2 = { name: 'John Doe', age: 30 };
    expect(hasAdditionalProperties(obj2)).toBe(false);
  });

  it('should return false if the input is not an object', () => {
    // Test case 1: Null input
    const obj1 = null;
    expect(hasAdditionalProperties(obj1)).toBe(false);

    // Test case 2: Number input
    const obj2 = 123;
    expect(hasAdditionalProperties(obj2)).toBe(false);

    // Test case 3: String input
    const obj3 = 'test';
    expect(hasAdditionalProperties(obj3)).toBe(false);
  });
});

describe('updateApiRefs', () => {
  it('should update the $ref property and add the ref property', () => {
    const obj = {
      $ref: 'someRef',
    };
    const restApi = 'myRestApi';

    updateApiRefs(obj, restApi);

    expect(obj).toEqual({
      ref: 'https://apigateway.amazonaws.com/restapis/myRestApi/models/someRefModel',
    });
  });

  it('should delete the $ref property if it exists', () => {
    const obj = {
      $ref: 'someRef',
    };
    const restApi = 'myRestApi';

    updateApiRefs(obj, restApi);

    expect(obj).not.toHaveProperty('$ref');
  });

  it('should delete the additionalProperties property if it exists', () => {
    const obj = {
      additionalProperties: true,
    };
    const restApi = 'myRestApi';

    updateApiRefs(obj, restApi);

    expect(obj).not.toHaveProperty('additionalProperties');
  });

  it('should recursively update the $ref property and add the ref property', () => {
    const obj = {
      $ref: 'someRef',
      nested: {
        $ref: 'nestedRef',
      },
    };
    const restApi = 'myRestApi';

    updateApiRefs(obj, restApi);

    expect(obj).toEqual({
      ref: 'https://apigateway.amazonaws.com/restapis/myRestApi/models/someRefModel',
      nested: {
        ref: 'https://apigateway.amazonaws.com/restapis/myRestApi/models/nestedRefModel',
      },
    });
  });

  it('should not modify the object if it is not an object', () => {
    const obj = 'notAnObject';
    const restApi = 'myRestApi';

    updateApiRefs(obj, restApi);

    expect(obj).toBe('notAnObject');
  });

  it('should not modify the object if it is null', () => {
    const obj = null;
    const restApi = 'myRestApi';

    updateApiRefs(obj, restApi);

    expect(obj).toBeNull();
  });
});
