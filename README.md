# aws-construct-openapi

From the [blog post from matt martz](https://matt.martz.codes/openapi-specs-from-cdk-stack-without-deploying-first)

## Usage

Declare a new instance of the `OpenApiConstruct`:

```typescript
const api = new OpenApiConstruct(this, 'OpenApi', {
  tsconfigPath: `${join(__dirname, '..', 'tsconfig.json')}`,
  apiProps: {
    defaultMethodOptions: {
      authorizer: auth,
    },
  },
  models: `${__dirname}/interfaces`,
});
```

Declare the `methodResponses` and the `lambda` function

```typescript
const methodResponses = [
  {
    // Successful response from the integration
    statusCode: '200',
    // Define what parameters are allowed or not
    responseParameters: {
      'method.response.header.Content-Type': true,
      'method.response.header.Access-Control-Allow-Origin': true,
      'method.response.header.Access-Control-Allow-Credentials': true,
    },
    // Validate the schema on the response
    responseModels: {
      'application/json': 'Response',
    },
  },
];
```

Add the endpoints as needed:

```typescript
api.addEndpoint('/example/{hello}/basic', 'POST', {
  lambda: basicLambda,
  requiredParameters: ['hello'],
  requestModels: {
    'application/json': 'Basic',
  },
  methodResponses,
});
```

Generate the schema:

```typescript
api.generateOpenApiSpec(join(`${__dirname}`, '..', 'openapigenerated.json'));
```
