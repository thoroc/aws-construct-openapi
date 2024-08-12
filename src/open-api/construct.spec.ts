import * as fs from 'fs';
import * as path from 'path';
import { App, Stack } from 'aws-cdk-lib';
import { Model, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { OpenApiConstruct } from '.';

describe('OpenApiConstruct', () => {
  let openApi: OpenApiConstruct;

  beforeEach(() => {
    const app = new App();
    const stack = new Stack(app, 'TestStack');
    const projectPath = process.cwd();

    openApi = new OpenApiConstruct(stack, 'testId', {
      apiProps: {},
      tsconfigPath: path.join(projectPath, 'tsconfig.dev.json'),
      models: path.join(projectPath, 'src', 'models'),
    });
  });

  it('should add a validator', () => {
    // Arrange

    // Act
    const returnedValue = openApi.addValidator('testValidator', true, true);

    // Assert
    expect(returnedValue).toBeUndefined();
    expect(Object.keys(openApi.validators)).toContain('testValidator');
    expect(Object.keys(openApi.validators).length).toBe(1);
  });

  it('should not add a validator if it already exists', () => {
    // Arrange
    const validator = new RequestValidator(openApi, 'testValidator', {
      restApi: openApi.restApi,
    });
    openApi.validators.testValidator = validator;

    // Act
    const returnedValue = openApi.addValidator('testValidator', true, true);

    // Assert
    expect(returnedValue).toBeUndefined();
    expect(Object.keys(openApi.validators)).toContain('testValidator');
    expect(Object.keys(openApi.validators).length).toBe(1);
    expect(openApi.validators.testValidator).toBe(validator);
  });

  it('should add a model', () => {
    // Arrange

    // Act
    const returnedValue = openApi.addModel('testModel', {
      modelName: 'TestModel',
      schema: {},
    });

    // Assert
    expect(returnedValue).toBeUndefined();
    expect(Object.keys(openApi.models)).toContain('testModel');
    expect(Object.keys(openApi.models).length).toBe(1);
  });

  it('should not add a model if it already exists', () => {
    // Arrange
    const model = new Model(openApi, 'testModel', {
      restApi: openApi.restApi,
      schema: {},
    });
    openApi.models.testModel = model;

    // Act
    const returnedValue = openApi.addModel('testModel', {
      modelName: 'TestModel',
      schema: {},
    });

    // Assert
    expect(returnedValue).toBeUndefined();
    expect(Object.keys(openApi.models)).toContain('testModel');
    expect(Object.keys(openApi.models).length).toBe(1);
    expect(openApi.models.testModel).toBe(model);
  });

  it('should add resources for a path', () => {
    // Arrange

    // Act
    openApi.addResourcesForPath('/test/path');

    // Assert
    expect(Object.keys(openApi.resources)).toContain('/test');
    expect(Object.keys(openApi.resources)).toContain('/test/path');
  });

  it('should add an endpoint', () => {
    // Arrange

    // Act
    openApi.addEndpoint('/test/path', 'GET', {
      requestModels: {},
      requiredParameters: [],
      lambda: new Function(openApi, 'testFunction', {
        runtime: Runtime.NODEJS_LATEST,
        handler: 'index.handler',
        code: Code.fromInline(
          'exports.handler = async () => ({ statusCode: 200 });',
        ),
      }),
      methodResponses: [],
    });

    // Assert
    expect(Object.keys(openApi.openApiSpec.paths)).toContain('/test/path');
    expect(Object.keys(openApi.openApiSpec.paths['/test/path'])).toContain(
      'get',
    );
  });

  it('should generate the OpenAPI spec', () => {
    // Arrange
    const tempPath = path.join(__dirname, 'test-data');

    fs.mkdirSync(tempPath, { recursive: true });
    const outputPath = path.join(tempPath, 'openapi.json');

    // Act
    const openApiSpec = openApi.generateOpenApiSpec(outputPath);

    // Assert
    expect(openApiSpec.openapi).toBe('3.0.1');
    expect(openApiSpec.info.title).toBe('testId');
    expect(openApiSpec.info.version).toBeDefined();
    // Add more assertions as needed

    fs.rmSync(tempPath, { recursive: true });
  });
});
