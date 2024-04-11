import { JsonSchema } from 'aws-cdk-lib/aws-apigateway';
import { OpenApiMethod } from './method';

export interface OpenApiSpec {
  readonly openapi: string;
  readonly info: { title: string; version: string };
  readonly paths: {
    [key: string]: {
      [key: string]: OpenApiMethod;
    };
  };
  readonly components: {
    schemas: {
      [key: string]: {
        title: string;
        required?: string[];
        type: string;
        properties: JsonSchema['properties'];
      };
    };
    securitySchemes: {
      [key: string]: {
        type: 'apiKey';
        name: 'Authorization';
        in: 'header';
        'x-amazon-apigateway-authtype': 'custom';
      };
    };
  };
}
