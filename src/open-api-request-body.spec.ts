import { OpenApiRequestBody } from './open-api-request-body';

describe('OpenApiRequestBody', () => {
  it('should have content property', () => {
    const requestBody: OpenApiRequestBody = {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/MySchema',
          },
        },
      },
      required: true,
    };

    expect(requestBody.content).toBeDefined();
    expect(requestBody.content['application/json']).toBeDefined();
    expect(requestBody.content['application/json'].schema).toBeDefined();
    expect(requestBody.content['application/json'].schema.$ref).toBe(
      '#/components/schemas/MySchema',
    );
  });

  it('should have required property', () => {
    const requestBody: OpenApiRequestBody = {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/MySchema',
          },
        },
      },
      required: true,
    };

    expect(requestBody.required).toBe(true);
  });
});
