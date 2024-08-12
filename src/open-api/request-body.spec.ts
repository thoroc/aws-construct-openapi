import { OpenApiRequestBody } from './request-body';

describe('OpenApiRequestBody', () => {
  it('should have content and required properties', () => {
    const requestBodyProps: OpenApiRequestBody = {
      content: {},
      required: true,
    };

    expect(requestBodyProps).toBeDefined();
    expect(requestBodyProps.content).toBeDefined();
    expect(typeof requestBodyProps.content).toBe('object');
    expect(requestBodyProps.required).toBeDefined();
    expect(typeof requestBodyProps.required).toBe('boolean');
  });
});
