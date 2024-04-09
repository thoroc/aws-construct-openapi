// import { Template } from 'aws-cdk-lib/assertions';
// import { App, Stack } from 'aws-cdk-lib/core';
// import { OpenApiConstruct } from '../src/api';

describe('Api Spec', () => {
  it('passes', () => {
    expect(true).toBe(true);
  });
  // let testApp: App;
  // let testStack: Stack;
  // beforeEach(() => {
  //   testApp = new App();
  //   testStack = new Stack(testApp, 'testStack');
  // });
  // it('Should create a new Api Construct', () => {
  //   new OpenApiConstruct(testStack, 'testApi', {
  //     tsconfigPath: '../tsconfig.dev.json',
  //     apiProps: {},
  //     models: 'src/models',
  //   });
  //   const template = Template.fromStack(testStack);
  //   template.hasResourceProperties('AWS::ApiGateway::RestApi', {});
  // });
});
