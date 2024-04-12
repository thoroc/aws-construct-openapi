import { OpenApiSpecProps } from './open-api-spec';

describe('OpenApiSpecProps', () => {
  it('should have the required properties', () => {
    const openApiSpec: OpenApiSpecProps = {
      openapi: '1.0.0',
      info: {
        title: 'API Title',
        version: '1.0.0',
      },
      paths: {},
      components: {
        schemas: {},
        securitySchemes: {},
      },
    };

    expect(openApiSpec.openapi).toBe('1.0.0');
    expect(openApiSpec.info.title).toBe('API Title');
    expect(openApiSpec.info.version).toBe('1.0.0');
    expect(openApiSpec.paths).toEqual({});
    expect(openApiSpec.components.schemas).toEqual({});
    expect(openApiSpec.components.securitySchemes).toEqual({});
  });
});
