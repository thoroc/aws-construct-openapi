import { JsonSchema } from 'aws-cdk-lib/aws-apigateway';
import { OpenApiMethodProps } from './open-api-method';

type InfoTitle = string;
type InfoVersion = string;

export interface OpenApiSpecProps {
  readonly openapi: string;
  readonly info: Record<InfoTitle, InfoVersion>;
  readonly paths: {
    [key: string]: {
      [key: string]: OpenApiMethodProps;
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
