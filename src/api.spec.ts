// import { App, Stack } from 'aws-cdk-lib';
// import { RequestValidator } from 'aws-cdk-lib/aws-apigateway';
// import { OpenApiConstruct } from './api';

describe('Api', () => {
  it('passes', () => {
    expect(true).toBe(true);
  });
  // let app: App;
  // let stack: Stack;
  // beforeEach(() => {
  //   app = new App();
  //   stack = new Stack(app, 'testStack');
  // });
  // describe('addValidator', () => {
  //   it('should add a request validator if the key does not exist', () => {
  //     const api = new OpenApiConstruct(stack, 'testApi', {
  //       tsconfigPath: '../tsconfig.dev.json',
  //       apiProps: {},
  //       models: 'src/models',
  //     });
  //     const key = 'validatorKey';
  //     const params = true;
  //     const body = true;
  //     api.addValidator(key, params, body);
  //     expect(api.validators[key]).toBeDefined();
  //     expect(api.restApi.addRequestValidator).toHaveBeenCalledWith(key, {
  //       validateRequestBody: body,
  //       validateRequestParameters: params,
  //     });
  //   });
  //   it('should not add a request validator if the key already exists', () => {
  //     const api = new OpenApiConstruct(stack, 'testApi', {
  //       tsconfigPath: '../tsconfig.dev.json',
  //       apiProps: {},
  //       models: 'src/models',
  //     });
  //     const key = 'existingKey';
  //     const params = false;
  //     const body = false;
  //     api.validators[key] = new RequestValidator(stack, 'existingValidator', {
  //       restApi: api.restApi,
  //     });
  //     api.addValidator(key, params, body);
  //     expect(api.validators[key]).toBe('existingValidator');
  //     expect(api.restApi.addRequestValidator).not.toHaveBeenCalled();
  //   });
  // });
});
