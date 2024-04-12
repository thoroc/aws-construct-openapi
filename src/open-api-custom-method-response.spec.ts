import { CustomMethodResponse } from './open-api-custom-method-response';

describe('CustomMethodResponse', () => {
  it('should have the correct properties', () => {
    const customMethodResponse: CustomMethodResponse = {
      statusCode: '200',
      responseParameters: {
        'Content-Type': true,
        'Access-Control-Allow-Origin': true,
      },
      responseModels: {
        'application/json': 'MyModel',
      },
    };

    expect(customMethodResponse.statusCode).toBe('200');
    expect(customMethodResponse.responseParameters).toEqual({
      'Content-Type': true,
      'Access-Control-Allow-Origin': true,
    });
    expect(customMethodResponse.responseModels).toEqual({
      'application/json': 'MyModel',
    });
  });
});
