import { App, Stack } from 'aws-cdk-lib';
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { OpenApiPath, OpenApiPathProps } from './open-api-path';

describe('OpenApiPath', () => {
  let app: App;
  let stack: Stack;
  let context: Construct;
  let lambda: LambdaFunction;
  let props: OpenApiPathProps;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'test-stack');
    context = new Construct(stack, 'test-context');
    lambda = new LambdaFunction(stack, 'test-lambda', {
      runtime: Runtime.NODEJS_LATEST,
      handler: 'index.handler',
      code: Code.fromInline('exports.handler = async () => "hello world";'),
    });
    props = {
      lambda,
      requiredParameters: ['param1', 'param2'],
      requestModels: { model1: 'Model1', model2: 'Model2' },
      methodResponses: [
        {
          statusCode: '200',
          responseModels: { 'application/json': 'Model1' },
          responseParameters: {},
        },
      ],
    };
  });

  it('should create an instance of OpenApiPath', () => {
    const openApiPath = new OpenApiPath(context, 'test-path', props);

    expect(openApiPath).toBeInstanceOf(OpenApiPath);
    expect(openApiPath.lambda).toBe(lambda);
    expect(openApiPath.requiredParameters).toEqual(['param1', 'param2']);
    expect(openApiPath.requestModels).toEqual({
      model1: 'Model1',
      model2: 'Model2',
    });
    expect(openApiPath.methodResponses).toEqual([
      {
        statusCode: '200',
        responseModels: { 'application/json': 'Model1' },
        responseParameters: {},
      },
    ]);
  });
});
