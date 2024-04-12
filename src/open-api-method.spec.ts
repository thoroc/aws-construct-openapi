import {
  OpenApiMethodParameterProps,
  OpenApiMethodParameterSchemaProps,
  OpenApiMethodProps,
  OpenApiMethodResponseProps,
} from './open-api-method';

describe('OpenApiMethodParameterSchemaProps', () => {
  it('should have a type property', () => {
    const props: OpenApiMethodParameterSchemaProps = {
      type: 'string',
    };

    expect(props.type).toBeDefined();
    expect(typeof props.type).toBe('string');
  });
});

describe('OpenApiMethodParameterProps', () => {
  it('should have the correct properties', () => {
    const parameter: OpenApiMethodParameterProps = {
      name: 'param1',
      in: 'query',
      required: true,
      schema: {
        type: '',
      },
    };

    expect(parameter.name).toBe('param1');
    expect(parameter.in).toBe('query');
    expect(parameter.required).toBe(true);
    expect(parameter.schema).toBeDefined();
  });
});

describe('OpenApiMethodResponseProps', () => {
  it('should have the correct properties', () => {
    const responseProps: OpenApiMethodResponseProps = {
      description: 'Sample description',
      headers: { 'Content-Type': 'application/json' },
      content: { 'application/json': { schema: { type: 'object' } } },
    };

    expect(responseProps.description).toEqual('Sample description');
    expect(responseProps.headers).toEqual({
      'Content-Type': 'application/json',
    });
    expect(responseProps.content).toEqual({
      'application/json': { schema: { type: 'object' } },
    });
  });
});

describe('OpenApiMethodProps', () => {
  it('should have the correct properties', () => {
    const methodProps: OpenApiMethodProps = {
      parameters: [],
      responses: {},
      security: [],
    };

    expect(methodProps).toHaveProperty('parameters');
    expect(methodProps).toHaveProperty('responses');
    expect(methodProps).toHaveProperty('security');
  });

  it('should have the correct properties when requestBody is provided', () => {
    const methodProps: OpenApiMethodProps = {
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MySchema',
            },
          },
        },
        required: true,
      },
      responses: {},
      security: [],
    };

    expect(methodProps).toHaveProperty('parameters');
    expect(methodProps).toHaveProperty('requestBody');
    expect(methodProps).toHaveProperty('responses');
    expect(methodProps).toHaveProperty('security');
  });
});
